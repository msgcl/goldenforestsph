import { storage } from "./storage";

export type SiteInventorySettings = {
  panayPlanted: number;
  saleAgarwoodSeedlings: number;
  saleMangoSeedlings: number;
  saleCarabaoMango: number;
  inventoryDate: string;
};

export const defaultSiteInventorySettings: SiteInventorySettings = {
  panayPlanted: 800,
  saleAgarwoodSeedlings: 23000,
  saleMangoSeedlings: 8000,
  saleCarabaoMango: 0,
  inventoryDate: "2026-07-20T00:00:00.000Z",
};

export async function readSiteInventorySettings(): Promise<SiteInventorySettings> {
  const latest = await storage.getLatestSiteInventorySettings();
  if (!latest) return defaultSiteInventorySettings;

  // Transparently migrate the pre-July 2026 launch inventory retained in existing databases.
  if (
    latest.saleAgarwoodSeedlings === 34000 &&
    latest.saleMangoSeedlings === 14000 &&
    latest.saleCarabaoMango === 750
  ) {
    return defaultSiteInventorySettings;
  }

  return {
    panayPlanted: latest.panayPlanted,
    saleAgarwoodSeedlings: latest.saleAgarwoodSeedlings,
    saleMangoSeedlings: latest.saleMangoSeedlings,
    saleCarabaoMango: latest.saleCarabaoMango,
    inventoryDate: latest.inventoryDate.toISOString(),
  };
}

export async function writeSiteInventorySettings(settings: SiteInventorySettings): Promise<void> {
  await storage.createSiteInventorySettings({
    panayPlanted: settings.panayPlanted,
    saleAgarwoodSeedlings: settings.saleAgarwoodSeedlings,
    saleMangoSeedlings: settings.saleMangoSeedlings,
    saleCarabaoMango: settings.saleCarabaoMango,
    inventoryDate: new Date(settings.inventoryDate),
  });
}
