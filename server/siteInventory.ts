import fs from "fs/promises";
import path from "path";

export type SiteInventorySettings = {
  panayPlanted: number;
  saleAgarwoodSeedlings: number;
  saleMangoSeedlings: number;
  saleCarabaoMango: number;
  inventoryDate: string;
};

export const defaultSiteInventorySettings: SiteInventorySettings = {
  panayPlanted: 800,
  saleAgarwoodSeedlings: 34000,
  saleMangoSeedlings: 14000,
  saleCarabaoMango: 750,
  inventoryDate: "2026-03-19T00:00:00.000Z",
};

const settingsPath = path.resolve(process.cwd(), ".local", "site-inventory.json");

async function ensureDirectory() {
  await fs.mkdir(path.dirname(settingsPath), { recursive: true });
}

export async function readSiteInventorySettings(): Promise<SiteInventorySettings> {
  try {
    const raw = await fs.readFile(settingsPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteInventorySettings>;
    return {
      panayPlanted: Number.isFinite(Number(parsed.panayPlanted))
        ? Number(parsed.panayPlanted)
        : defaultSiteInventorySettings.panayPlanted,
      saleAgarwoodSeedlings: Number.isFinite(Number(parsed.saleAgarwoodSeedlings))
        ? Number(parsed.saleAgarwoodSeedlings)
        : defaultSiteInventorySettings.saleAgarwoodSeedlings,
      saleMangoSeedlings: Number.isFinite(Number(parsed.saleMangoSeedlings))
        ? Number(parsed.saleMangoSeedlings)
        : defaultSiteInventorySettings.saleMangoSeedlings,
      saleCarabaoMango: Number.isFinite(Number(parsed.saleCarabaoMango))
        ? Number(parsed.saleCarabaoMango)
        : defaultSiteInventorySettings.saleCarabaoMango,
      inventoryDate:
        typeof parsed.inventoryDate === "string" && parsed.inventoryDate
          ? parsed.inventoryDate
          : defaultSiteInventorySettings.inventoryDate,
    };
  } catch {
    return defaultSiteInventorySettings;
  }
}

export async function writeSiteInventorySettings(settings: SiteInventorySettings): Promise<void> {
  await ensureDirectory();
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), "utf8");
}
