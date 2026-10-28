import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { v2 as cloudinary } from "cloudinary";
import pg from "pg";

const root = "gallery/panay-october-2026";
const manifestPath = `${root}/manifest.json`;
type Item = { title: string; description: string; category: string; location: string; date: string; mediaUrl: string; publicId: string; originalFile: string };
let items: Item[];
try {
  items = JSON.parse(await fs.readFile(manifestPath, "utf8"));
} catch (error: any) {
  if (error.code !== "ENOENT") throw error;
  for (const key of ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]) {
    if (!process.env[key]) throw new Error(`${key} is required`);
  }
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  const inputs: { original: string; enhanced: string }[] = JSON.parse(await fs.readFile(".local/panay-gallery-enhancements.json", "utf8"));
  if (inputs.length !== 4) throw new Error("Expected four enhanced Panay mango photos");
  const captions = [
  [
    "Panay Mango — Field Rows",
    "Young mango trees planted in rows across a grassy field on Panay Island, with established tropical vegetation along the field boundary."
  ],
  [
    "Panay Mango — Plantation View",
    "Mango trees growing across an open planting area among coconut palms on Panay Island."
  ],
  [
    "Panay Mango — Young Tree Growth",
    "A close view of a young mango tree showing leafy growth, with additional young trees visible across the Panay planting field."
  ],
  [
    "Panay Mango — Field Establishment",
    "A mango tree supported by a wooden stake in the Panay planting field, with neighboring young trees and surrounding vegetation visible."
  ]
];
  await fs.mkdir(`${root}/originals`, { recursive: true });
  await fs.mkdir(`${root}/enhanced`, { recursive: true });
  await fs.mkdir("output/imagegen/panay-october-2026", { recursive: true });
  items = [];
  for (const [index, input] of inputs.entries()) {
    const name = `panay-october-2026-${String(index + 1).padStart(2, "0")}`;
    await fs.copyFile(input.original, `${root}/originals/${name}.jpeg`);
    await fs.copyFile(input.enhanced, `output/imagegen/panay-october-2026/${name}.png`);
    const result = await cloudinary.uploader.upload(input.enhanced, {
      folder: "golden-forests/gallery/panay-october-2026", public_id: name,
      resource_type: "image", overwrite: false, unique_filename: false,
      format: "jpg", quality: "auto:good",
    });
    const response = await fetch(result.secure_url);
    if (!response.ok) throw new Error(`Cloudinary delivery failed for ${name}`);
    await fs.writeFile(`${root}/enhanced/${name}.jpg`, Buffer.from(await response.arrayBuffer()));
    items.push({ title: captions[index][0], description: captions[index][1], category: "plantation",
      location: "Panay Island, Western Visayas", date: "2026-10-28T00:00:00.000Z",
      mediaUrl: result.secure_url, publicId: result.public_id, originalFile: path.basename(input.original) });
    await fs.writeFile(`${root}/manifest.partial.json`, JSON.stringify(items, null, 2) + "\n");
    console.log(`Uploaded and verified ${name}`);
  }
  await fs.writeFile(manifestPath, JSON.stringify(items, null, 2) + "\n");
  await fs.unlink(`${root}/manifest.partial.json`);
}
if (items.length !== 4 || new Set(items.map(item => item.mediaUrl)).size !== 4) throw new Error("Expected four distinct batch assets");
for (const item of items) {
  const url = new URL(item.mediaUrl);
  if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com" || !url.pathname.includes("/golden-forests/gallery/panay-october-2026/")) throw new Error("Unexpected asset URL");
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(20261012)");
  const before = (await client.query("SELECT * FROM gallery_media ORDER BY id FOR UPDATE")).rows;
  await fs.mkdir(".local/gallery-backups", { recursive: true });
  await fs.writeFile(`.local/gallery-backups/before-panay-import-${Date.now()}.json`, JSON.stringify(before, null, 2));
  let added = 0;
  for (const item of items) {
    if ((await client.query("SELECT id FROM gallery_media WHERE media_url=$1", [item.mediaUrl])).rowCount) continue;
    await client.query("INSERT INTO gallery_media (title,description,category,location,date,media_url,thumbnail_url,media_type,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$6,'image',0)",
      [item.title, item.description, item.category, item.location, item.date, item.mediaUrl]);
    added++;
  }
  const after = (await client.query("SELECT * FROM gallery_media WHERE id=ANY($1::int[]) ORDER BY id", [before.map(row => row.id)])).rows;
  if (!isDeepStrictEqual(before, after)) throw new Error("Existing gallery changed; rolling back");
  await client.query("COMMIT");
  console.log(JSON.stringify({ added, existingItemsUnchanged: before.length }));
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally { client.release(); await pool.end(); }
