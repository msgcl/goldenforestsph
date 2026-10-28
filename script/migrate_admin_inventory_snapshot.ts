import "dotenv/config";
import pg from "pg";
import { defaultSiteInventorySettings } from "../server/siteInventory";

// Materialize the values previously substituted on every read. After this
// one-time migration, future admin saves are always returned unchanged.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  const latest = (await pool.query("SELECT * FROM site_inventory_settings ORDER BY id DESC LIMIT 1")).rows[0];
  const legacy = latest && new Date(latest.created_at) < new Date("2026-10-28T00:00:00Z") &&
    [[34000, 14000, 750], [32000, 12000, 640]].some(([a, m, c]) => latest.sale_agarwood_seedlings === a && latest.sale_mango_seedlings === m && latest.sale_carabao_mango === c);
  if (legacy) {
    const settings = defaultSiteInventorySettings;
    await pool.query("INSERT INTO site_inventory_settings (panay_planted,sale_agarwood_seedlings,sale_mango_seedlings,sale_carabao_mango,inventory_date) VALUES ($1,$2,$3,$4,$5)", [settings.panayPlanted, settings.saleAgarwoodSeedlings, settings.saleMangoSeedlings, settings.saleCarabaoMango, settings.inventoryDate]);
  }
  console.log(JSON.stringify({ migratedLegacySnapshot: Boolean(legacy) }));
} finally { await pool.end(); }
