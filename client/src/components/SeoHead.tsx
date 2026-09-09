import { useEffect } from "react";
import { useLocation } from "wouter";
import { canonicalOrigin, canonicalUrl, resolveSeoPage } from "@shared/seo";

const shareImage = `${canonicalOrigin}/golden-forests-logo.png`;

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export function SeoHead() {
  const [location] = useLocation();

  useEffect(() => {
    const { page } = resolveSeoPage(location);
    const url = canonicalUrl(location);

    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[name="robots"]', "content", page.indexable ? "index, follow" : "noindex, nofollow");
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", shareImage);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    setMeta('meta[name="twitter:image"]', "content", shareImage);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [location]);

  return null;
}
