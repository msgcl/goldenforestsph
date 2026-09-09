import { canonicalOrigin, canonicalUrl, resolveSeoPage } from "@shared/seo";

const shareImage = `${canonicalOrigin}/golden-forests-logo.png`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceTag(html: string, attribute: string, value: string): string {
  const pattern = new RegExp(`(<meta[^>]*${attribute}[^>]*content=")[^"]*("[^>]*>)`, "i");
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

export function renderSeoHtml(template: string, pathname: string): string {
  const { page } = resolveSeoPage(pathname);
  const url = canonicalUrl(pathname);
  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  html = replaceTag(html, 'name="description"', page.description);
  html = replaceTag(html, 'name="robots"', page.indexable ? "index, follow" : "noindex, nofollow");
  html = replaceTag(html, 'property="og:title"', page.title);
  html = replaceTag(html, 'property="og:description"', page.description);
  html = replaceTag(html, 'property="og:url"', url);
  html = replaceTag(html, 'property="og:image"', shareImage);
  html = replaceTag(html, 'name="twitter:title"', page.title);
  html = replaceTag(html, 'name="twitter:description"', page.description);
  html = replaceTag(html, 'name="twitter:image"', shareImage);
  html = html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*("[^>]*>)/i,
    `$1${escapeHtml(url)}$2`,
  );

  return html;
}
