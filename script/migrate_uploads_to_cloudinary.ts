import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { db } from "../server/db";
import {
  teamMembers,
  galleryMedia,
  operationalUpdates,
} from "../shared/schema";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for migration`);
  }
  return value;
}

function isLocalUploadUrl(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith("/uploads/");
}

function getLocalFilePath(uploadUrl: string) {
  const fileName = uploadUrl.replace("/uploads/", "");
  return path.resolve(process.cwd(), "uploads", fileName);
}

async function ensureFileExists(filePath: string) {
  await fs.access(filePath);
}

async function uploadLocalFile(uploadUrl: string) {
  const filePath = getLocalFilePath(uploadUrl);
  await ensureFileExists(filePath);

  const parsed = path.parse(filePath);
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "golden-forests/migrated",
    public_id: parsed.name,
    resource_type: "auto",
    overwrite: false,
    use_filename: false,
    unique_filename: false,
  });

  return result.secure_url;
}

async function main() {
  cloudinary.config({
    cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET"),
  });

  const uploadedUrlMap = new Map<string, string>();

  async function getCloudinaryUrl(uploadUrl: string) {
    const existing = uploadedUrlMap.get(uploadUrl);
    if (existing) return existing;
    const secureUrl = await uploadLocalFile(uploadUrl);
    uploadedUrlMap.set(uploadUrl, secureUrl);
    return secureUrl;
  }

  const members = await db.select().from(teamMembers);
  const updates = await db.select().from(operationalUpdates);
  const mediaItems = await db.select().from(galleryMedia);

  let migratedMembers = 0;
  let migratedUpdates = 0;
  let migratedMedia = 0;

  for (const member of members) {
    if (!isLocalUploadUrl(member.imageUrl)) continue;
    const secureUrl = await getCloudinaryUrl(member.imageUrl);
    await db
      .update(teamMembers)
      .set({ imageUrl: secureUrl })
      .where(eq(teamMembers.id, member.id));
    migratedMembers += 1;
    console.log(`Migrated team member ${member.id}: ${member.name}`);
  }

  for (const update of updates) {
    if (!isLocalUploadUrl(update.imageUrl)) continue;
    const secureUrl = await getCloudinaryUrl(update.imageUrl);
    await db
      .update(operationalUpdates)
      .set({ imageUrl: secureUrl })
      .where(eq(operationalUpdates.id, update.id));
    migratedUpdates += 1;
    console.log(`Migrated operational update ${update.id}: ${update.title}`);
  }

  for (const item of mediaItems) {
    const nextMediaUrl = isLocalUploadUrl(item.mediaUrl)
      ? await getCloudinaryUrl(item.mediaUrl)
      : item.mediaUrl;
    const nextThumbnailUrl = isLocalUploadUrl(item.thumbnailUrl)
      ? await getCloudinaryUrl(item.thumbnailUrl)
      : item.thumbnailUrl;

    if (nextMediaUrl === item.mediaUrl && nextThumbnailUrl === item.thumbnailUrl) {
      continue;
    }

    await db
      .update(galleryMedia)
      .set({
        mediaUrl: nextMediaUrl,
        thumbnailUrl: nextThumbnailUrl,
      })
      .where(eq(galleryMedia.id, item.id));
    migratedMedia += 1;
    console.log(`Migrated gallery media ${item.id}: ${item.title}`);
  }

  console.log(
    JSON.stringify(
      {
        migratedMembers,
        migratedUpdates,
        migratedMedia,
        uploadedFiles: uploadedUrlMap.size,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
