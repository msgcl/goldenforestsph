import "dotenv/config";
import fs from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import pg from "pg";

const items = JSON.parse(await fs.readFile("gallery/panay-october-2026/manifest.json", "utf8"));
if (items.length !== 4 || items.some((item: any) => !item.mediaUrl.includes("/golden-forests/gallery/panay-october-2026/"))) {
  throw new Error("Expected exactly the four Panay mango images");
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(20261012)");
  const before = (await client.query("SELECT * FROM gallery_media ORDER BY id FOR UPDATE")).rows;
  await fs.mkdir(".local/gallery-backups", { recursive: true });
  await fs.writeFile(`.local/gallery-backups/before-panay-metadata-update-${Date.now()}.json`, JSON.stringify(before, null, 2));
  for (const item of items) {
    const result = await client.query("UPDATE gallery_media SET title=$1, description=$2, location=$3 WHERE media_url=$4", [item.title, item.description, item.location, item.mediaUrl]);
    if (result.rowCount !== 1) throw new Error(`Expected exactly one gallery item for ${item.title}`);
  }
  const after = (await client.query("SELECT * FROM gallery_media ORDER BY id")).rows;
  const expected = before.map(row => {
    const item = items.find((item: any) => item.mediaUrl === row.media_url);
    return item ? { ...row, title: item.title, description: item.description, location: item.location } : row;
  });
  if (!isDeepStrictEqual(after, expected)) throw new Error("Unexpected gallery change; rolling back");
  await client.query("COMMIT");
  console.log(JSON.stringify({ updated: items.length, olderItemsUnchanged: before.length - items.length, cloudinaryUrlsUnchanged: true }));
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
