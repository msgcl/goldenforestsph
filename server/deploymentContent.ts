import { pool } from "./db";
import { defaultSiteCopy, normalizeSiteCopy } from "@shared/siteCopy";
import october from "../gallery/october-2026/manifest.json";
import negros from "../gallery/negros-october-2026/manifest.json";
import panay from "../gallery/panay-october-2026/manifest.json";

const migrationKey = "2026-10-29-gallery-and-nursery-v1";
const items = [...october, ...negros, ...panay];

// The manifests are bundled into dist/index.cjs. Production needs neither local
// source photographs nor upload credentials to display these Cloudinary assets.
export async function applyDeploymentContent() {
  if (items.length !== 19 || new Set(items.map(item => item.mediaUrl)).size !== 19) throw new Error("Invalid deployment gallery batch");
  for (const item of items) {
    const url = new URL(item.mediaUrl);
    if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com" || !url.pathname.includes("/golden-forests/gallery/")) throw new Error("Unexpected gallery asset URL");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(20261029)");
    await client.query("CREATE TABLE IF NOT EXISTS site_content_migrations (key text PRIMARY KEY, applied_at timestamp NOT NULL DEFAULT now())");
    const inventoryCorrectionKey = "2026-10-29-agarwood-nursery-27600-v1";
    if (!(await client.query("SELECT key FROM site_content_migrations WHERE key=$1", [inventoryCorrectionKey])).rowCount) {
      await client.query("INSERT INTO nursery_stats (agarwood_seedlings,mango_seedlings,agarwood_height_cm,mango_height_cm,mortality_rate,last_updated) SELECT 27600,mango_seedlings,agarwood_height_cm,mango_height_cm,mortality_rate,NOW() FROM nursery_stats ORDER BY id DESC LIMIT 1");
      await client.query("INSERT INTO site_content_migrations (key) VALUES ($1)", [inventoryCorrectionKey]);
    }
    if ((await client.query("SELECT key FROM site_content_migrations WHERE key=$1", [migrationKey])).rowCount) {
      await client.query("COMMIT");
      return { applied: false, added: 0 };
    }
    let added = 0;
    for (const item of items) {
      const existing = await client.query("SELECT id FROM gallery_media WHERE media_url=$1", [item.mediaUrl]);
      if (existing.rowCount) {
        // Apply the final requested captions once, only to this new batch.
        await client.query("UPDATE gallery_media SET title=$1,description=$2,category=$3,location=$4 WHERE media_url=$5", [item.title, item.description, item.category, item.location, item.mediaUrl]);
      } else {
        await client.query("INSERT INTO gallery_media (title,description,category,location,date,media_url,thumbnail_url,media_type,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$6,'image',0)", [item.title, item.description, item.category, item.location, item.date, item.mediaUrl]);
        added++;
      }
    }
    const stats = (await client.query("SELECT * FROM nursery_stats ORDER BY id DESC LIMIT 1")).rows[0];
    if (!stats) throw new Error("Nursery must be initialized before applying deployment content");
    if (stats.agarwood_seedlings !== 27600 || stats.agarwood_height_cm !== 88) {
      await client.query("INSERT INTO nursery_stats (agarwood_seedlings,mango_seedlings,agarwood_height_cm,mango_height_cm,mortality_rate,last_updated) VALUES (27600,$1,88,$2,$3,NOW())", [stats.mango_seedlings, stats.mango_height_cm, stats.mortality_rate]);
    }
    const saved = (await client.query("SELECT data FROM site_copy_content ORDER BY id DESC LIMIT 1")).rows[0];
    const copy = normalizeSiteCopy(saved?.data ?? defaultSiteCopy);
    copy.nursery.growthLabels[0] = defaultSiteCopy.nursery.growthLabels[0];
    copy.nursery.growthDescriptions[0] = defaultSiteCopy.nursery.growthDescriptions[0];
    const timestamp = new Date().toISOString();
    copy._meta.updatedAt = timestamp;
    copy._meta.sections.nursery = { updatedAt: timestamp };
    await client.query("INSERT INTO site_copy_content (data) VALUES ($1)", [JSON.stringify(copy)]);
    await client.query("INSERT INTO site_content_migrations (key) VALUES ($1)", [migrationKey]);
    await client.query("COMMIT");
    console.log(`Deployment content applied: ${added} gallery photos added; 19 batch captions verified.`);
    return { applied: true, added };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
