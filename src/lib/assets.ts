/**
 * Публичные файлы из /public с учётом basePath (GitHub Pages: /motorent36).
 * NEXT_PUBLIC_BASE_PATH и NEXT_PUBLIC_SITE_URL задаются в Actions при сборке.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Путь к файлу из /public для <img src>. На проде — абсолютный URL с /motorent36. */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (siteUrl && !/localhost/i.test(siteUrl)) {
    return `${siteUrl}${normalized}`;
  }
  return basePath ? `${basePath}${normalized}` : normalized;
}

/** Абсолютный URL файла из /public (JSON-LD, og:image). siteUrl уже включает basePath. */
export function absoluteAssetUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}
