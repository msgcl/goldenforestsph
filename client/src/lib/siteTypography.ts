import type { SiteCopy } from "@shared/siteCopy";
import { cn } from "@/lib/utils";

export type SiteCopyPageKey = Exclude<keyof SiteCopy, "_meta" | "typography">;
export type BrandFontOption = "open-sans" | "playfair-display";

export const BRAND_FONT_OPTIONS: Array<{
  value: "default" | BrandFontOption;
  label: string;
}> = [
  { value: "default", label: "Use page default" },
  { value: "open-sans", label: "Open Sans" },
  { value: "playfair-display", label: "Playfair Display" },
];

function resolveFontOverrideClass(font: BrandFontOption | undefined) {
  if (font === "open-sans") return "!font-sans";
  if (font === "playfair-display") return "!font-serif";
  return "";
}

export function createPageTypography(siteCopy: SiteCopy | undefined, page: SiteCopyPageKey) {
  return (fieldPath: string, className?: string) =>
    cn(className, resolveFontOverrideClass(siteCopy?.typography?.[page]?.[fieldPath]));
}
