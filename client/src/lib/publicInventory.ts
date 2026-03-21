export const PUBLIC_INVENTORY_DATE_LABEL = "March 19, 2026";
export const PANAY_PLANTING_COUNT = "800";
export const DEFAULT_INVENTORY_DATE_ISO = "2026-03-19T00:00:00.000Z";

export const physicalInventory = [
  {
    label: "Agarwood seedlings in nursery",
    field: "agarwoodSeedlings",
    note: "Healthy nursery stock",
  },
  {
    label: "Sweet Elena Carabao mango seedlings in nursery",
    field: "mangoSeedlings",
    note: "Nursery propagation inventory",
  },
] as const;

export const saleInventory = [
  {
    label: "Agarwood seedlings available for sale",
    field: "saleAgarwoodSeedlings",
    note: "Current inventory",
  },
  {
    label: "Sweet Elena mango seedlings available for sale",
    field: "saleMangoSeedlings",
    note: "Current inventory",
  },
  {
    label: "Carabao mango inventory available for sale",
    field: "saleCarabaoMango",
    note: "Current inventory",
  },
] as const;

export const defaultInventoryValues = {
  agarwoodSeedlings: 40000,
  mangoSeedlings: 15000,
  panayPlanted: 800,
  saleAgarwoodSeedlings: 34000,
  saleMangoSeedlings: 14000,
  saleCarabaoMango: 750,
  inventoryDate: DEFAULT_INVENTORY_DATE_ISO,
} as const;
