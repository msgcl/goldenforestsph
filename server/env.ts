import "dotenv/config";

function requireEnvVar(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const isProduction = process.env.NODE_ENV === "production";

export const env = {
  isProduction,
  sessionSecret: isProduction
    ? requireEnvVar("SESSION_SECRET")
    : process.env.SESSION_SECRET?.trim() || "cadi-dev-session-secret",
  adminUsername: isProduction
    ? requireEnvVar("ADMIN_USERNAME")
    : process.env.ADMIN_USERNAME?.trim() || "admin",
  adminPassword: isProduction
    ? requireEnvVar("ADMIN_PASSWORD")
    : process.env.ADMIN_PASSWORD?.trim() || "admin123",
  cloudinaryCloudName: isProduction
    ? requireEnvVar("CLOUDINARY_CLOUD_NAME")
    : process.env.CLOUDINARY_CLOUD_NAME?.trim() || "",
  cloudinaryApiKey: isProduction
    ? requireEnvVar("CLOUDINARY_API_KEY")
    : process.env.CLOUDINARY_API_KEY?.trim() || "",
  cloudinaryApiSecret: isProduction
    ? requireEnvVar("CLOUDINARY_API_SECRET")
    : process.env.CLOUDINARY_API_SECRET?.trim() || "",
};
