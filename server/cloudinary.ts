import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

let configured = false;

function ensureConfigured() {
  if (configured) return true;

  const cloudName = env.cloudinaryCloudName;
  const apiKey = env.cloudinaryApiKey;
  const apiSecret = env.cloudinaryApiSecret;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  configured = true;
  return true;
}

export function isCloudinaryConfigured() {
  return ensureConfigured();
}

export async function uploadDataUrlToCloudinary(
  dataUrl: string,
  fileName: string,
  mimeType: string,
) {
  if (!ensureConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  const resourceType = mimeType.startsWith("video/") ? "video" : "image";
  const publicId = fileName.replace(/\.[^.]+$/, "");

  return await cloudinary.uploader.upload(dataUrl, {
    folder: "golden-forests",
    public_id: publicId,
    resource_type: resourceType,
    overwrite: false,
  });
}
