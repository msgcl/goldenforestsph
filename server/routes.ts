import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { randomUUID } from "crypto";
import { z } from "zod";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { isCloudinaryConfigured, uploadDataUrlToCloudinary } from "./cloudinary";
import {
  readSiteInventorySettings,
  writeSiteInventorySettings,
} from "./siteInventory";
import { readSiteCopy, writeSiteCopy } from "./siteCopy";
import { normalizeSiteCopy, siteCopySchema } from "@shared/siteCopy";
import { env } from "./env";

type RealtimeEventPayload = {
  queryKeys: string[];
  entity: "team-members" | "operational-updates" | "nursery-stats" | "gallery-media" | "site-copy";
  action: "create" | "update" | "delete";
};

declare module "express-session" {
  interface SessionData {
    adminUsername?: string;
  }
}

const adminCredentials = {
  username: env.adminUsername,
  password: env.adminPassword,
};

const contactMessageInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const teamMemberInputSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  experience: z.string().min(1),
  expertise: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
  orderIndex: z.number().int().default(0),
});

const operationalUpdateInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  date: z.coerce.date(),
  imageUrl: z.string().nullable().optional(),
});

const nurseryStatsInputSchema = z.object({
  agarwoodSeedlings: z.number().int().nonnegative(),
  mangoSeedlings: z.number().int().nonnegative(),
  agarwoodHeightCm: z.number().int().nonnegative(),
  mangoHeightCm: z.number().int().nonnegative(),
  mortalityRate: z.string().min(1),
  lastUpdated: z.coerce.date(),
  panayPlanted: z.number().int().nonnegative(),
  saleAgarwoodSeedlings: z.number().int().nonnegative(),
  saleMangoSeedlings: z.number().int().nonnegative(),
  saleCarabaoMango: z.number().int().nonnegative(),
  inventoryDate: z.coerce.date(),
});

const galleryMediaInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  date: z.coerce.date(),
  mediaUrl: z.string().min(1),
  thumbnailUrl: z.string().nullable().optional(),
  mediaType: z.enum(["image", "video"]).default("image"),
  sortOrder: z.number().int().default(0),
});

const uploadSchema = z.object({
  fileName: z.string().min(1),
  dataUrl: z.string().min(1),
});

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminUsername) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

function parseIdParam(req: Request): number | null {
  const parsed = Number(req.params.id);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const realtimeClients = new Set<Response>();

  const sendRealtimeEvent = (payload: RealtimeEventPayload) => {
    const data = `event: content-updated\ndata: ${JSON.stringify(payload)}\n\n`;
    realtimeClients.forEach((client) => {
      client.write(data);
    });
  };

  app.get("/api/realtime/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    res.write('event: connected\ndata: {"ok":true}\n\n');
    realtimeClients.add(res);

    req.on("close", () => {
      realtimeClients.delete(res);
    });
  });

  app.get(api.teamMembers.list.path, async (_req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.get(api.operationalUpdates.list.path, async (_req, res) => {
    const updates = await storage.getOperationalUpdates();
    res.json(updates);
  });

  app.get(api.nurseryStats.latest.path, async (_req, res) => {
    const stats = await storage.getLatestNurseryStats();
    if (!stats) {
      return res.status(404).json({ message: "No nursery stats available" });
    }
    const inventorySettings = await readSiteInventorySettings();
    res.json({ ...stats, ...inventorySettings });
  });

  app.get(api.galleryMedia.list.path, async (_req, res) => {
    const media = await storage.getGalleryMedia();
    res.json(media);
  });

  app.get(api.siteCopy.get.path, async (_req, res) => {
    const siteCopy = await readSiteCopy();
    res.json(siteCopy);
  });

  app.get(api.admin.me.path, (req, res) => {
    if (!req.session.adminUsername) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ username: req.session.adminUsername });
  });

  app.post(api.admin.login.path, (req, res) => {
    const parsed = api.admin.login.body.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid credentials payload" });
    }

    const { username, password } = parsed.data;
    if (
      username !== adminCredentials.username ||
      password !== adminCredentials.password
    ) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.session.adminUsername = username;
    res.json({ username });
  });

  app.post(api.admin.logout.path, requireAdmin, (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  app.post(api.admin.teamMembers.create.path, requireAdmin, async (req, res) => {
    const parsed = teamMemberInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid team member payload" });
    }
    const created = await storage.createTeamMember(parsed.data);
    sendRealtimeEvent({
      queryKeys: [api.teamMembers.list.path],
      entity: "team-members",
      action: "create",
    });
    res.status(201).json(created);
  });

  app.patch(api.admin.teamMembers.update.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid team member id" });
    }
    const parsed = teamMemberInputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid team member payload" });
    }
    const updated = await storage.updateTeamMember(id, parsed.data);
    if (!updated) {
      return res.status(404).json({ message: "Team member not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.teamMembers.list.path],
      entity: "team-members",
      action: "update",
    });
    res.json(updated);
  });

  app.delete(api.admin.teamMembers.delete.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid team member id" });
    }
    const deleted = await storage.deleteTeamMember(id);
    if (!deleted) {
      return res.status(404).json({ message: "Team member not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.teamMembers.list.path],
      entity: "team-members",
      action: "delete",
    });
    res.json({ success: true });
  });

  app.post(api.admin.operationalUpdates.create.path, requireAdmin, async (req, res) => {
    const parsed = operationalUpdateInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid operational update payload" });
    }
    const created = await storage.createOperationalUpdate(parsed.data);
    sendRealtimeEvent({
      queryKeys: [api.operationalUpdates.list.path],
      entity: "operational-updates",
      action: "create",
    });
    res.status(201).json(created);
  });

  app.patch(api.admin.operationalUpdates.update.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid operational update id" });
    }
    const parsed = operationalUpdateInputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid operational update payload" });
    }
    const updated = await storage.updateOperationalUpdate(id, parsed.data);
    if (!updated) {
      return res.status(404).json({ message: "Operational update not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.operationalUpdates.list.path],
      entity: "operational-updates",
      action: "update",
    });
    res.json(updated);
  });

  app.delete(api.admin.operationalUpdates.delete.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid operational update id" });
    }
    const deleted = await storage.deleteOperationalUpdate(id);
    if (!deleted) {
      return res.status(404).json({ message: "Operational update not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.operationalUpdates.list.path],
      entity: "operational-updates",
      action: "delete",
    });
    res.json({ success: true });
  });

  app.post(api.admin.nurseryStats.create.path, requireAdmin, async (req, res) => {
    const parsed = nurseryStatsInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid nursery stats payload" });
    }
    const autoTimestamp = new Date();
    const {
      panayPlanted,
      saleAgarwoodSeedlings,
      saleMangoSeedlings,
      saleCarabaoMango,
      ...dbStats
    } = parsed.data;
    const created = await storage.createNurseryStats({
      ...dbStats,
      lastUpdated: autoTimestamp,
    });
    await writeSiteInventorySettings({
      panayPlanted,
      saleAgarwoodSeedlings,
      saleMangoSeedlings,
      saleCarabaoMango,
      inventoryDate: autoTimestamp.toISOString(),
    });
    sendRealtimeEvent({
      queryKeys: [api.nurseryStats.latest.path],
      entity: "nursery-stats",
      action: "update",
    });
    res.status(201).json({
      ...created,
      panayPlanted,
      saleAgarwoodSeedlings,
      saleMangoSeedlings,
      saleCarabaoMango,
      inventoryDate: autoTimestamp,
    });
  });

  app.post(api.admin.galleryMedia.create.path, requireAdmin, async (req, res) => {
    const parsed = galleryMediaInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid gallery media payload" });
    }
    const created = await storage.createGalleryMedia(parsed.data);
    sendRealtimeEvent({
      queryKeys: [api.galleryMedia.list.path],
      entity: "gallery-media",
      action: "create",
    });
    res.status(201).json(created);
  });

  app.patch(api.admin.galleryMedia.update.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid gallery media id" });
    }
    const parsed = galleryMediaInputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid gallery media payload" });
    }
    const updated = await storage.updateGalleryMedia(id, parsed.data);
    if (!updated) {
      return res.status(404).json({ message: "Gallery media not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.galleryMedia.list.path],
      entity: "gallery-media",
      action: "update",
    });
    res.json(updated);
  });

  app.delete(api.admin.galleryMedia.delete.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid gallery media id" });
    }
    const deleted = await storage.deleteGalleryMedia(id);
    if (!deleted) {
      return res.status(404).json({ message: "Gallery media not found" });
    }
    sendRealtimeEvent({
      queryKeys: [api.galleryMedia.list.path],
      entity: "gallery-media",
      action: "delete",
    });
    res.json({ success: true });
  });

  app.get(api.admin.contactMessages.list.path, requireAdmin, async (_req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  app.delete(api.admin.contactMessages.delete.path, requireAdmin, async (req, res) => {
    const id = parseIdParam(req);
    if (!id) {
      return res.status(400).json({ message: "Invalid contact message id" });
    }
    const deleted = await storage.deleteContactMessage(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    res.json({ success: true });
  });

  app.delete(api.admin.contactMessages.clear.path, requireAdmin, async (_req, res) => {
    const deletedCount = await storage.deleteAllContactMessages();
    res.json({ success: true, deletedCount });
  });

  app.get(api.admin.siteCopy.get.path, requireAdmin, async (_req, res) => {
    const siteCopy = await readSiteCopy();
    res.json(siteCopy);
  });

  app.post(api.admin.siteCopy.update.path, requireAdmin, async (req, res) => {
    const parsed = siteCopySchema.safeParse(normalizeSiteCopy(req.body));
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid site copy payload" });
    }

    const savedSiteCopy = await writeSiteCopy(parsed.data);
    sendRealtimeEvent({
      queryKeys: [api.siteCopy.get.path],
      entity: "site-copy",
      action: "update",
    });
    res.json(savedSiteCopy);
  });

  app.post(api.admin.uploads.create.path, requireAdmin, async (req, res) => {
    const parsed = uploadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid upload payload" });
    }

    const match = parsed.data.dataUrl.match(/^data:([\w/+.-]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ message: "Invalid data URL format" });
    }

    const mimeType = match[1];
    if (!mimeType.startsWith("image/") && !mimeType.startsWith("video/")) {
      return res.status(400).json({ message: "Only image and video uploads are supported" });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(500).json({ message: "Cloudinary is not configured for uploads" });
    }

    const originalName = parsed.data.fileName.replace(/[^\w.-]/g, "_");
    const extensionMatch = originalName.match(/\.[^.]+$/);
    const extension = extensionMatch?.[0] ?? (mimeType.startsWith("video/") ? ".mp4" : ".png");
    const fileName = `${Date.now()}-${randomUUID()}${extension}`;
    if (!isCloudinaryConfigured()) {
      return res.status(500).json({ message: "Cloudinary is not configured for uploads" });
    }

    const uploaded = await uploadDataUrlToCloudinary(parsed.data.dataUrl, fileName, mimeType);
    res.status(201).json({ url: uploaded.secure_url });
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingMembers = await storage.getTeamMembers();

  if (existingMembers.length === 0) {
    await storage.createTeamMember({
      name: "Charles McKenzie",
      title: "Chairman",
      category: "Executive Management",
      experience:
        "Seasoned executive with over 30 years of leadership in asset management and fixed-income investments across London, Frankfurt, and Sydney, including senior roles at Deutsche Morgan Grenfell, Aberdeen Asset Management, JP Morgan Asset Management, and Fidelity International.",
      expertise:
        "Institutional fixed-income strategy, portfolio leadership, and corporate governance; holds a BSc (Hons) in Economics from the University of Southampton and an MBA (Finance) from Bayes Business School, City, University of London.",
      imageUrl: null,
      orderIndex: 1,
    });

    await storage.createTeamMember({
      name: "Mark LM Quinn",
      title: "Chief Executive Officer",
      category: "Executive Management",
      experience:
        "Seasoned international entrepreneur and executive with 25+ years of experience structuring, financing, and scaling commercially viable projects across renewable energy, carbon markets, agroforestry, and sustainable infrastructure in emerging markets. He has founded, led, and advised ventures spanning biomass power, biofuels, carbon sequestration, agroforestry, and clean technologies, with a track record across concept design, financial modelling, capital raising, regulatory approvals, execution, and exit.",
      expertise:
        "Founder and CEO of Crassna Agro forestry Development Inc. (Philippines), developing large-scale privately managed agarwood and high-density mango plantations through international IP licensing, long-term financial structuring, capital raising, permitting, and diversified downside-risk strategy. He also serves as a Member and Advisor to the Philippines British Business Council and brings deep expertise across carbon finance, emissions trading, renewable energy, waste-to-energy, international trade, financial analysis, and technology commercialization, with project execution experience across Asia, Africa, Europe, and the Middle East.",
      imageUrl: null,
      orderIndex: 2,
    });

    await storage.createTeamMember({
      name: "Cord Kabus-Duprée",
      title: "Director of Marketing & Sales",
      category: "Executive Management",
      experience:
        "More than 20 years in financial advisory, family-office engagement, and international investor relations, with prior senior roles in European wealth and institutional capital networks and 12 years with Horbach Wirtschaftsberatung GmbH (Swiss Life Group Germany).",
      expertise:
        "Strategic marketing and sales leadership, investor development, and healthcare supply commercialization, including U.S. market execution of key medical equipment during the Covid-19 period; holds a Master’s in Business Administration and CFP certification.",
      imageUrl: null,
      orderIndex: 3,
    });

    await storage.createTeamMember({
      name: "Angie Brion",
      title: "Financial Controller",
      category: "Executive Management",
      experience:
        "Experienced accountant and financial controller with over 20 years of measurable performance across financial management, tax preparation, audit, and financial modeling, supported by a Bachelor of Science in Accounting.",
      expertise:
        "Regulatory and compliance leadership spanning Board of Investments tax incentives, SEC requirements, Bureau of Customs import protocols, and DENR/BPI permitting and reporting for agarwood propagation, planting, and trade.",
      imageUrl: null,
      orderIndex: 4,
    });

    await storage.createTeamMember({
      name: "Marciano Gecolea",
      title: "Agroforestry Director",
      category: "Board of Directors",
      experience:
        "Licensed forester with over three decades of agroforestry and plantation leadership, including regional responsibility across Southeast Asia for large-scale agarwood projects from land acquisition to processing and value-added production.",
      expertise:
        "Sustainable agroforestry systems, land suitability and GIS-guided plantation planning, permitting and environmental compliance, and community-based livelihood integration; holds a Master’s in Resource Management from Lincoln University and a BS Forestry from UP Los Banos.",
      imageUrl: null,
      orderIndex: 5,
    });

    await storage.createTeamMember({
      name: "R.A.G Ferdinand Domingo",
      title: "Agro-Science Director",
      category: "Board of Directors",
      experience:
        "Associate Professor and Director of PRMSU Mango Research and Development Center with more than 40 years of experience in mango cultivation, SMART mango production, and commercialization of pre- and post-production mango technologies.",
      expertise:
        "Research and deployment of dwarf mango technology, integrated pest and disease management, and copyrighted studies on mango cecid fly, mango twig borer bio-ecology, and productivity enhancement for carabao mango; holds a Master’s in Agricultural Technology Education from Central Luzon State University.",
      imageUrl: null,
      orderIndex: 6,
    });

    await storage.createTeamMember({
      name: "Romina Dalit",
      title: "Public Relations Manager",
      category: "Senior Management",
      experience:
        "Over 12 years in government service and executive support roles, including secretary to the Mayor and Vice Governor, followed by five years leading public relations initiatives for major Philippine corporations.",
      expertise:
        "Corporate communications, media and public image management, real estate transaction facilitation, and compliance oversight for agarwood-related import/export, CITES, Bureau of Customs, wildlife-cultural permitting, and land transportation requirements.",
      imageUrl: null,
      orderIndex: 7,
    });

    await storage.createTeamMember({
      name: "Billy Medel",
      title: "Plantation Manager",
      category: "Senior Management",
      experience:
        "Built his career through field and community operations with PNOC-EDC, later serving as Nursery Manager and Plantation Manager with responsibility for importing and propagating two million seedlings and leading land leasing and community relations.",
      expertise:
        "Plantation execution and nursery scale-up across agarwood and essential oil crops (ylang-ylang, patchouli, and vetiver), including importation, propagation, and out-planting management of more than 75,000 agarwood saplings via third-party grower networks.",
      imageUrl: null,
      orderIndex: 8,
    });

    await storage.createTeamMember({
      name: "Kyla Brion",
      title: "Office Administrator",
      category: "Senior Management",
      experience:
        "Detail-oriented and motivated professional with hands-on experience in accounting assistance, bookkeeping, financial documentation, and auditing support. Experienced in preparing financial statements, maintaining accurate accounting records, organizing financial documents, and assisting with financial transactions.",
      expertise:
        "Strong organizational skills, attention to detail, and the ability to handle confidential financial information. Proficient in Microsoft Office and basic accounting support tasks, with the ability to work efficiently under pressure while maintaining accuracy and professionalism while continuing to develop financial and analytical skills in a professional environment.",
      imageUrl: null,
      orderIndex: 9,
    });

    await storage.createTeamMember({
      name: "Mara Sofia Gecolea",
      title: "Technical Administrator",
      category: "Senior Management",
      experience: "8+ years in technical documentation and data management",
      expertise: "Technical reporting, compliance documentation, database administration",
      imageUrl: null,
      orderIndex: 10,
    });

    console.log("Seeded team members");
  }

  const latestMembers = await storage.getTeamMembers();
  const hasAdeleFrances = latestMembers.some(
    (member) => member.name.trim().toLowerCase() === "adele frances"
  );

  const kylaBrion = latestMembers.find(
    (member) => member.name.trim().toLowerCase() === "kyla brion"
  );

  if (
    kylaBrion &&
    (kylaBrion.experience === "10+ years in administrative operations and office management" ||
      kylaBrion.expertise === "Administrative coordination, document management, office systems")
  ) {
    await storage.updateTeamMember(kylaBrion.id, {
      experience:
        "Detail-oriented and motivated professional with hands-on experience in accounting assistance, bookkeeping, financial documentation, and auditing support. Experienced in preparing financial statements, maintaining accurate accounting records, organizing financial documents, and assisting with financial transactions.",
      expertise:
        "Strong organizational skills, attention to detail, and the ability to handle confidential financial information. Proficient in Microsoft Office and basic accounting support tasks, with the ability to work efficiently under pressure while maintaining accuracy and professionalism while continuing to develop financial and analytical skills in a professional environment.",
    });
  }

  if (!hasAdeleFrances) {
    await storage.createTeamMember({
      name: "Adele Frances",
      title: "Commercial Director",
      category: "Board of Directors",
      experience:
        "Adele serves as Commercial Director for Golden Forests, leading commercial strategy, brand positioning, and go-to-market execution across international markets. She works closely with the Dubai sales and marketing entity to support investor relations and market development across the UK, Europe, the Middle East, and Southeast Asia.",
      expertise:
        "With over 20 years of leadership across financial services, real estate, PropTech, and sustainable investment, Adele has built commercial infrastructure for international scale-ups, designed go-to-market frameworks across 10 markets, and repositioned brands for growth. Her prior roles include RTP Global, Druce, MFS Investment Management, RBC Wealth Management, Invesco, and Brewin Dolphin.",
      imageUrl: null,
      orderIndex: 11,
    });
    console.log("Seeded Board member: Adele Frances");
  }

  const existingUpdates = await storage.getOperationalUpdates();

  if (existingUpdates.length === 0) {
    await storage.createOperationalUpdate({
      title: "Nursery Expansion Complete",
      description:
        "Successfully expanded nursery capacity to accommodate 50,000 seedlings with new climate-controlled propagation zones and advanced irrigation systems.",
      category: "Nursery",
      date: new Date("2026-02-15"),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "DNA-Verified Aquilaria Crassna Stock Received",
      description:
        "Received certified Aquilaria crassna propagation material with DNA verification from approved sources. All seedlings meet DENR standards for commercial cultivation.",
      category: "Compliance",
      date: new Date("2026-02-10"),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "July 2026 Out-Planting Programme Confirmed",
      description:
        "Finalized site preparation for July 2026 out-planting of 15,000 agarwood and 3,000 mango trees in Southern Zambales. All permits secured and land preparation 85% complete.",
      category: "Plantation",
      date: new Date("2026-02-08"),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "AI Monitoring System Deployed",
      description:
        "Deployed advanced AI-powered monitoring system across all nursery zones. Real-time tracking of soil moisture, temperature, and growth metrics now operational.",
      category: "Technology",
      date: new Date("2026-02-01"),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "Reforestation Programme Launch",
      description:
        "Initiated 1:1 native tree reforestation programme. For every commercial tree sold, one native species (Narra, Molave, or Agoho) planted in designated conservation areas.",
      category: "Impact",
      date: new Date("2026-01-28"),
      imageUrl: null,
    });

    console.log("Seeded operational updates");
  }

  const existingStats = await storage.getLatestNurseryStats();
  if (!existingStats) {
    await storage.createNurseryStats({
      agarwoodSeedlings: 42750,
      mangoSeedlings: 8000,
      agarwoodHeightCm: 52,
      mangoHeightCm: 100,
      mortalityRate: "3.2%",
      lastUpdated: new Date(),
    });
    console.log("Seeded nursery stats");
  }

  const existingMedia = await storage.getGalleryMedia();
  if (existingMedia.length === 0) {
    const seedItems = [
      {
        title: "Agarwood Seedlings - Nursery Block 1",
        description: "Agarwood seedlings under shade-net nursery conditions.",
        category: "nursery",
        location: "Kabankalan City, Western Visayas",
        date: new Date("2026-02-27"),
        mediaUrl: "/nursery/agarwood/agarwood-01.jpg",
        thumbnailUrl: "/nursery/agarwood/agarwood-01.jpg",
        mediaType: "image" as const,
        sortOrder: 2,
      },
      {
        title: "Agarwood Seedlings - Nursery Block 2",
        description: "Dense stand of healthy agarwood seedlings in propagation bags.",
        category: "nursery",
        location: "Kabankalan City, Western Visayas",
        date: new Date("2026-02-27"),
        mediaUrl: "/nursery/agarwood/agarwood-02.jpg",
        thumbnailUrl: "/nursery/agarwood/agarwood-02.jpg",
        mediaType: "image" as const,
        sortOrder: 4,
      },
      {
        title: "Sweet Elena Mango Carabao Grafting",
        description: "Video of Sweet Elena Mango Carabao seedlings being grafted in the nursery.",
        category: "nursery",
        location: "Kabankalan City, Western Visayas",
        date: new Date("2026-02-27"),
        mediaUrl: "/nursery/mango/mango-grafting.mp4",
        thumbnailUrl: "/nursery/mango/mango-02.jpg",
        mediaType: "video" as const,
        sortOrder: 2,
      },
      {
        title: "Land Preparation - Phase 1",
        description: "Deep ripping and soil preparation for optimal root development across plantation area.",
        category: "plantation",
        location: "Zambales Plantation Site",
        date: new Date("2026-02-10"),
        mediaUrl:
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=200&fit=crop",
        mediaType: "image" as const,
        sortOrder: 2,
      },
      {
        title: "Operations Center",
        description: "Central command hub for monitoring all plantation metrics and operational data.",
        category: "facilities",
        location: "Zambales Operations Center",
        date: new Date("2026-02-23"),
        mediaUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
        mediaType: "image" as const,
        sortOrder: 2,
      },
      {
        title: "Team Site Inspection",
        description: "CADI Management team conducting quarterly field assessment and quality verification.",
        category: "team",
        location: "On-site Team Activity",
        date: new Date("2026-02-21"),
        mediaUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
        mediaType: "image" as const,
        sortOrder: 2,
      },
    ];

    for (const item of seedItems) {
      await storage.createGalleryMedia(item);
    }
    console.log("Seeded gallery media");
  }

}

