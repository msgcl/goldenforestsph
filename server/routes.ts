import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.teamMembers.list.path, async (req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.get(api.operationalUpdates.list.path, async (req, res) => {
    const updates = await storage.getOperationalUpdates();
    res.json(updates);
  });

  app.get(api.nurseryStats.latest.path, async (req, res) => {
    const stats = await storage.getLatestNurseryStats();
    if (!stats) {
      return res.status(404).json({ message: 'No nursery stats available' });
    }
    res.json(stats);
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
      experience: "30+ years in agricultural development and international business",
      expertise: "Strategic planning, corporate governance, agroforestry investment",
      imageUrl: null,
      orderIndex: 1,
    });

    await storage.createTeamMember({
      name: "Mark LM Quinn",
      title: "Chief Executive Officer",
      category: "Executive Management",
      experience: "25+ years in plantation management and sustainable agriculture",
      expertise: "Operational excellence, business development, stakeholder relations",
      imageUrl: null,
      orderIndex: 2,
    });

    await storage.createTeamMember({
      name: "Cord Kabus-Dupree",
      title: "Director of Marketing & Sales",
      category: "Executive Management",
      experience: "15+ years in international marketing and client relations",
      expertise: "Brand development, client acquisition, market analysis",
      imageUrl: null,
      orderIndex: 3,
    });

    await storage.createTeamMember({
      name: "Angie Brion",
      title: "Financial Controller",
      category: "Executive Management",
      experience: "20+ years in financial management and corporate accounting",
      expertise: "Financial reporting, compliance, treasury management",
      imageUrl: null,
      orderIndex: 4,
    });

    await storage.createTeamMember({
      name: "Marciano Gecolea",
      title: "Agroforestry Director",
      category: "Board of Directors",
      experience: "35+ years in forestry science and plantation development",
      expertise: "Agroforestry systems, sustainable land management, technical oversight",
      imageUrl: null,
      orderIndex: 5,
    });

    await storage.createTeamMember({
      name: "R.A.G Ferdinand Domingo",
      title: "Agro-Science Director",
      category: "Board of Directors",
      experience: "28+ years in agricultural research and crop science",
      expertise: "Plant genetics, soil science, yield optimization",
      imageUrl: null,
      orderIndex: 6,
    });

    await storage.createTeamMember({
      name: "Romina Dalit",
      title: "Public Relations Manager",
      category: "Senior Management",
      experience: "12+ years in corporate communications and stakeholder engagement",
      expertise: "Media relations, community outreach, brand communications",
      imageUrl: null,
      orderIndex: 7,
    });

    await storage.createTeamMember({
      name: "Billy Medel",
      title: "Plantation Manager",
      category: "Senior Management",
      experience: "18+ years in field operations and plantation management",
      expertise: "Day-to-day operations, worker supervision, quality control",
      imageUrl: null,
      orderIndex: 8,
    });

    await storage.createTeamMember({
      name: "Kyla Brion",
      title: "Office Administrator",
      category: "Senior Management",
      experience: "10+ years in administrative operations and office management",
      expertise: "Administrative coordination, document management, office systems",
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

    console.log("✓ Seeded team members");
  }

  const existingUpdates = await storage.getOperationalUpdates();
  
  if (existingUpdates.length === 0) {
    await storage.createOperationalUpdate({
      title: "Nursery Expansion Complete",
      description: "Successfully expanded nursery capacity to accommodate 50,000 seedlings with new climate-controlled propagation zones and advanced irrigation systems.",
      category: "Nursery",
      date: new Date('2026-02-15'),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "DNA-Verified Aquilaria Crassna Stock Received",
      description: "Received certified Aquilaria crassna propagation material with DNA verification from approved sources. All seedlings meet DENR standards for commercial cultivation.",
      category: "Compliance",
      date: new Date('2026-02-10'),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "July 2026 Out-Planting Programme Confirmed",
      description: "Finalized site preparation for July 2026 out-planting of 15,000 agarwood and 3,000 mango trees in Southern Zambales. All permits secured and land preparation 85% complete.",
      category: "Plantation",
      date: new Date('2026-02-08'),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "AI Monitoring System Deployed",
      description: "Deployed advanced AI-powered monitoring system across all nursery zones. Real-time tracking of soil moisture, temperature, and growth metrics now operational.",
      category: "Technology",
      date: new Date('2026-02-01'),
      imageUrl: null,
    });

    await storage.createOperationalUpdate({
      title: "Reforestation Programme Launch",
      description: "Initiated 1:1 native tree reforestation programme. For every commercial tree sold, one native species (Narra, Molave, or Agoho) planted in designated conservation areas.",
      category: "Impact",
      date: new Date('2026-01-28'),
      imageUrl: null,
    });

    console.log("✓ Seeded operational updates");
  }

  const existingStats = await storage.getLatestNurseryStats();
  
  if (!existingStats) {
    await storage.createNurseryStats({
      agarwoodSeedlings: 42750,
      mangoSeedlings: 8540,
      averageHeight: "45-60cm (agarwood), 80-120cm (mango)",
      mortalityRate: "3.2%",
      lastUpdated: new Date(),
    });

    console.log("✓ Seeded nursery stats");
  }
}
