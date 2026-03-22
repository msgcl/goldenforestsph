import {
  defaultSiteCopy,
  normalizeSiteCopy,
  siteCopySchema,
  type SiteCopy,
} from "@shared/siteCopy";
import { storage } from "./storage";

export async function readSiteCopy(): Promise<SiteCopy> {
  const latest = await storage.getLatestSiteCopyContent();
  if (!latest?.data) return defaultSiteCopy;
  return normalizeSiteCopy(latest.data);
}

export async function writeSiteCopy(copy: SiteCopy): Promise<SiteCopy> {
  const previous = await readSiteCopy();
  const incoming = normalizeSiteCopy(copy);
  const timestamp = new Date().toISOString();
  const nextMeta = {
    updatedAt: timestamp,
    sections: { ...previous._meta.sections },
  };

  const sectionKeys = Object.keys(defaultSiteCopy._meta.sections) as Array<keyof SiteCopy["_meta"]["sections"]>;
  for (const sectionKey of sectionKeys) {
    if (JSON.stringify(previous[sectionKey]) !== JSON.stringify(incoming[sectionKey])) {
      nextMeta.sections[sectionKey] = { updatedAt: timestamp };
    }
  }

  const normalized: SiteCopy = siteCopySchema.parse({
    ...incoming,
    _meta: nextMeta,
  });

  await storage.createSiteCopyContent(normalized);
  return normalized;
}
