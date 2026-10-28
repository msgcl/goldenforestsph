import "dotenv/config";
import fs from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import pg from "pg";

// Imports only the reviewed Cloudinary assets in this batch. Existing gallery
// rows are never updated or deleted; reruns skip assets already imported.
const items = JSON.parse(await fs.readFile("gallery/october-2026/manifest.json", "utf8"));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(20261012)");
  const before = (await client.query("SELECT * FROM gallery_media ORDER BY id")).rows;
  await fs.mkdir(".local/gallery-backups", { recursive: true });
  await fs.writeFile(`.local/gallery-backups/before-october-import-${Date.now()}.json`, JSON.stringify(before, null, 2));
  let added = 0;
  for (const item of items) {
    const url = new URL(item.mediaUrl);
    if (url.hostname !== "res.cloudinary.com" || url.protocol !== "https:") throw new Error("Expected a secure Cloudinary asset");
    const existing = await client.query("SELECT id FROM gallery_media WHERE media_url = $1", [item.mediaUrl]);
    if (existing.rowCount) continue;
    await client.query(
      "INSERT INTO gallery_media (title,description,category,location,date,media_url,thumbnail_url,media_type,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$6,'image',$7)",
      [item.title, item.description, item.category, item.location, item.date, item.mediaUrl, item.sortOrder],
    );
    added++;
  }
  const after = (await client.query("SELECT * FROM gallery_media WHERE id = ANY($1::int[]) ORDER BY id", [before.map(row => row.id)])).rows;
  if (!isDeepStrictEqual(before, after)) throw new Error("Existing gallery changed; rolling back this import");
  await client.query("COMMIT");
  console.log(JSON.stringify({ added, existingItemsUnchanged: before.length }));
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
