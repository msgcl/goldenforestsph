import fs from "fs/promises";
import path from "path";
import {
  defaultSiteCopy,
  siteCopySchema,
  type SiteCopy,
} from "@shared/siteCopy";

const siteCopyPath = path.resolve(process.cwd(), ".local", "site-copy.json");

async function ensureDirectory() {
  await fs.mkdir(path.dirname(siteCopyPath), { recursive: true });
}

export async function readSiteCopy(): Promise<SiteCopy> {
  try {
    const raw = await fs.readFile(siteCopyPath, "utf8");
    const parsed = JSON.parse(raw);
    return siteCopySchema.parse({
      ...defaultSiteCopy,
      ...parsed,
      contact: { ...defaultSiteCopy.contact, ...(parsed?.contact ?? {}) },
      about: {
        ...defaultSiteCopy.about,
        ...(parsed?.about ?? {}),
        header: { ...defaultSiteCopy.about.header, ...(parsed?.about?.header ?? {}) },
      },
      compliance: {
        ...defaultSiteCopy.compliance,
        ...(parsed?.compliance ?? {}),
        header: { ...defaultSiteCopy.compliance.header, ...(parsed?.compliance?.header ?? {}) },
      },
      technology: {
        ...defaultSiteCopy.technology,
        ...(parsed?.technology ?? {}),
        header: { ...defaultSiteCopy.technology.header, ...(parsed?.technology?.header ?? {}) },
      },
      impact: {
        ...defaultSiteCopy.impact,
        ...(parsed?.impact ?? {}),
        header: { ...defaultSiteCopy.impact.header, ...(parsed?.impact?.header ?? {}) },
      },
      clientServices: {
        ...defaultSiteCopy.clientServices,
        ...(parsed?.clientServices ?? {}),
        header: {
          ...defaultSiteCopy.clientServices.header,
          ...(parsed?.clientServices?.header ?? {}),
        },
      },
      mangoProgram: {
        ...defaultSiteCopy.mangoProgram,
        ...(parsed?.mangoProgram ?? {}),
        header: { ...defaultSiteCopy.mangoProgram.header, ...(parsed?.mangoProgram?.header ?? {}) },
      },
      agarwoodLifeCycle: {
        ...defaultSiteCopy.agarwoodLifeCycle,
        ...(parsed?.agarwoodLifeCycle ?? {}),
        header: {
          ...defaultSiteCopy.agarwoodLifeCycle.header,
          ...(parsed?.agarwoodLifeCycle?.header ?? {}),
        },
      },
      ecotourism: {
        ...defaultSiteCopy.ecotourism,
        ...(parsed?.ecotourism ?? {}),
        header: { ...defaultSiteCopy.ecotourism.header, ...(parsed?.ecotourism?.header ?? {}) },
      },
      home: { ...defaultSiteCopy.home, ...(parsed?.home ?? {}) },
      nursery: {
        ...defaultSiteCopy.nursery,
        ...(parsed?.nursery ?? {}),
        header: { ...defaultSiteCopy.nursery.header, ...(parsed?.nursery?.header ?? {}) },
      },
      plantation: {
        ...defaultSiteCopy.plantation,
        ...(parsed?.plantation ?? {}),
        header: { ...defaultSiteCopy.plantation.header, ...(parsed?.plantation?.header ?? {}) },
      },
      management: {
        ...defaultSiteCopy.management,
        ...(parsed?.management ?? {}),
        header: { ...defaultSiteCopy.management.header, ...(parsed?.management?.header ?? {}) },
      },
      photoGallery: { ...defaultSiteCopy.photoGallery, ...(parsed?.photoGallery ?? {}) },
    });
  } catch {
    return defaultSiteCopy;
  }
}

export async function writeSiteCopy(copy: SiteCopy): Promise<void> {
  const normalized = siteCopySchema.parse(copy);
  await ensureDirectory();
  await fs.writeFile(siteCopyPath, JSON.stringify(normalized, null, 2), "utf8");
}
