import "dotenv/config";
import pg from "pg";
import { normalizeSiteCopy, defaultSiteCopy } from "../shared/siteCopy";

const measurements = [158, 152, 152, 150, 165, 82, 95, 90, 87, 88, 21, 20, 22, 21, 20];
const average = Math.round(measurements.reduce((sum, height) => sum + height, 0) / measurements.length);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  const latest = (await client.query("SELECT * FROM nursery_stats ORDER BY id DESC LIMIT 1 FOR UPDATE")).rows[0];
  if (!latest) throw new Error("No nursery snapshot available");
  if (latest.agarwood_height_cm !== average) {
    await client.query("INSERT INTO nursery_stats (agarwood_seedlings,mango_seedlings,agarwood_height_cm,mango_height_cm,mortality_rate,last_updated) VALUES ($1,$2,$3,$4,$5,NOW())", [latest.agarwood_seedlings, latest.mango_seedlings, average, latest.mango_height_cm, latest.mortality_rate]);
  }
  const stored = (await client.query("SELECT data FROM site_copy_content ORDER BY id DESC LIMIT 1 FOR UPDATE")).rows[0];
  const copy = normalizeSiteCopy(stored?.data ?? defaultSiteCopy);
  const label = defaultSiteCopy.nursery.growthLabels[0];
  const description = defaultSiteCopy.nursery.growthDescriptions[0];
  if (copy.nursery.growthLabels[0] !== label || copy.nursery.growthDescriptions[0] !== description) {
    copy.nursery.growthLabels[0] = label;
    copy.nursery.growthDescriptions[0] = description;
    const timestamp = new Date().toISOString();
    copy._meta.updatedAt = timestamp;
    copy._meta.sections.nursery = { updatedAt: timestamp };
    await client.query("INSERT INTO site_copy_content (data) VALUES ($1)", [JSON.stringify(copy)]);
  }
  await client.query("COMMIT");
  console.log(JSON.stringify({ averageHeightCm: average, sampleSize: measurements.length }));
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally { client.release(); await pool.end(); }
