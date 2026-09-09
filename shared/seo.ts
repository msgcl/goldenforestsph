export const canonicalOrigin = "https://goldenforests.ai";

export type SeoPage = {
  title: string;
  description: string;
  indexable: boolean;
};

export const seoPages: Record<string, SeoPage> = {
  "/": {
    title: "CADI | Plantation Management Company in the Philippines",
    description:
      "Crassna Agroforestry Development Inc. (CADI) is a plantation management company based in the Philippines.",
    indexable: true,
  },
  "/about": {
    title: "About CADI | Philippine Plantation Management",
    description:
      "Learn about CADI, the Philippine company managing agarwood and mango plantation operations for Golden Forests.",
    indexable: true,
  },
  "/management": {
    title: "Management Team | CADI Philippines",
    description:
      "Meet the management team responsible for CADI's plantation operations, governance, compliance, and field delivery in the Philippines.",
    indexable: true,
  },
  "/nursery": {
    title: "Nursery Operations | CADI Philippines",
    description:
      "Explore CADI's agarwood and mango nursery operations, propagation processes, inventory, and preparation for field planting.",
    indexable: true,
  },
  "/plantation": {
    title: "Plantation Operations | CADI Philippines",
    description:
      "See CADI's plantation planning, field deployment, maintenance, and operational milestones in the Philippines.",
    indexable: true,
  },
  "/compliance": {
    title: "Compliance and Regulation | CADI Philippines",
    description:
      "Review CADI's approach to Philippine plantation compliance, documentation, traceability, and responsible export preparation.",
    indexable: true,
  },
  "/technology": {
    title: "Plantation Technology | CADI Philippines",
    description:
      "Discover how CADI uses monitoring, sensors, drones, irrigation, and operational data to support plantation management.",
    indexable: true,
  },
  "/impact": {
    title: "Community and Environmental Impact | CADI",
    description:
      "Learn about CADI's reforestation, employment, community engagement, and environmental stewardship in the Philippines.",
    indexable: true,
  },
  "/agarwood-life-cycle": {
    title: "Agarwood Programme and Lifecycle | CADI",
    description:
      "Explore CADI's managed Aquilaria crassna lifecycle, from nursery propagation and planting through inoculation and harvest support.",
    indexable: true,
  },
  "/mango-program": {
    title: "Sweet Elena Mango Programme | CADI",
    description:
      "Explore CADI's Sweet Elena mango programme, plantation approach, production lifecycle, and long-term orchard operations.",
    indexable: true,
  },
  "/plantation-visit": {
    title: "Plantation Visits | CADI Philippines",
    description:
      "Learn about visits to CADI plantation operations and nearby destinations in Zambales and Negros, Philippines.",
    indexable: true,
  },
  "/contact": {
    title: "Contact CADI | Plantation Management Philippines",
    description:
      "Contact Crassna Agroforestry Development Inc. for plantation operations and company enquiries in the Philippines.",
    indexable: true,
  },
  "/photo-gallery": {
    title: "Plantation Photo Gallery | CADI Philippines",
    description:
      "View photographs of CADI nursery propagation, plantation development, facilities, and field operations in the Philippines.",
    indexable: true,
  },
  "/disclaimer": {
    title: "Website Disclaimer | CADI",
    description:
      "Read the website disclaimer and important notices for the CADI plantation management website.",
    indexable: true,
  },
};

export const legacyRouteCanonicals: Record<string, string> = {
  "/location": "/plantation-visit",
  "/ecotourism": "/plantation-visit",
};

export function normalizeSeoPath(pathname: string): string {
  if (!pathname) return "/";
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || "/";
  if (withoutQuery === "/") return "/";
  return withoutQuery.replace(/\/+$/, "") || "/";
}

export function resolveSeoPage(pathname: string): {
  page: SeoPage;
  canonicalPath: string;
  found: boolean;
} {
  const normalizedPath = normalizeSeoPath(pathname);
  const canonicalPath = legacyRouteCanonicals[normalizedPath] ?? normalizedPath;
  const page = seoPages[canonicalPath];

  if (page) return { page, canonicalPath, found: true };

  return {
    page: {
      title: "Page Not Found | CADI",
      description: "The requested page could not be found.",
      indexable: false,
    },
    canonicalPath: normalizedPath,
    found: false,
  };
}

export function canonicalUrl(pathname: string): string {
  const { canonicalPath } = resolveSeoPage(pathname);
  return `${canonicalOrigin}${canonicalPath === "/" ? "/" : canonicalPath}`;
}
