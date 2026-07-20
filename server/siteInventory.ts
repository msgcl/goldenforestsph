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

  // Transparently migrate known pre-July 2026 inventory snapshots retained in
  // local and production databases. Future values entered through the admin
  // dashboard remain untouched.
  const isLegacyInventory = [
    [34000, 14000, 750],
    [32000, 12000, 640],
  ].some(
    ([agarwood, mango, carabao]) =>
      latest.saleAgarwoodSeedlings === agarwood &&
      latest.saleMangoSeedlings === mango &&
      latest.saleCarabaoMango === carabao,
  );

  if (isLegacyInventory) {
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
