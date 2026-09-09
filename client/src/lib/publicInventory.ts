export const PUBLIC_INVENTORY_DATE_LABEL = "July 20, 2026";
export const PANAY_PLANTING_COUNT = "800";
export const DEFAULT_INVENTORY_DATE_ISO = "2026-07-20T00:00:00.000Z";
export const AGARWOOD_BUFFER_STOCK = 4600;
export const MANGO_BUFFER_STOCK = 1600;

export const physicalInventory = [
  {
    label: "Agarwood seedlings in nursery",
    field: "agarwoodSeedlings",
    note: "Healthy nursery stock",
  },
  {
    label: "Sweet Elena mango seedlings in nursery",
    field: "mangoSeedlings",
    note: "Nursery propagation inventory",
  },
] as const;

export const saleInventory = [
  {
    label: "Agarwood trees allocated for deployment",
    field: "saleAgarwoodSeedlings",
    note: "Agarwood programme allocation",
  },
  {
    label: "Sweet Elena mango trees allocated for deployment",
    field: "saleMangoSeedlings",
    note: "Mango programme allocation",
  },
] as const;

export const defaultInventoryValues = {
  agarwoodSeedlings: 27600,
  mangoSeedlings: 9600,
  panayPlanted: 800,
  saleAgarwoodSeedlings: 23000,
  saleMangoSeedlings: 8000,
  saleCarabaoMango: 0,
  inventoryDate: DEFAULT_INVENTORY_DATE_ISO,
} as const;
