/**
 * Публичные файлы из /public с учётом basePath.
 * Прод: https://beri36.ru (BASE_PATH пустой). Variables задаются в Actions.
 */

export type AssetResolveOptions = {
  basePath?: string;
  siteUrl?: string;
};

/** Нормализация пути /public или passthrough для абсолютных URL. */
export function normalizePublicPath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Резолв URL ассета (чистая функция — удобно тестировать).
 * На проде с не-localhost siteUrl отдаём абсолютный URL (GH Pages + basePath в siteUrl).
 */
export function resolveAssetUrl(
  path: string,
  { basePath = "", siteUrl = "" }: AssetResolveOptions = {},
): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const normalized = normalizePublicPath(path);
  const cleanBase = basePath.replace(/\/$/, "");
  const cleanSite = siteUrl.replace(/\/$/, "");

  if (cleanSite && !/localhost/i.test(cleanSite)) {
    return `${cleanSite}${normalized}`;
  }
  return cleanBase ? `${cleanBase}${normalized}` : normalized;
}

/** Абсолютный URL для JSON-LD / Open Graph. */
export function resolveAbsoluteAssetUrl(
  path: string,
  siteUrl: string,
): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = normalizePublicPath(path);
  const cleanSite = siteUrl.replace(/\/$/, "");
  return `${cleanSite}${normalized}`;
}

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/** Путь к файлу из /public для <img src>. */
export function assetUrl(path: string): string {
  return resolveAssetUrl(path, { basePath, siteUrl });
}

/** Абсолютный URL файла из /public (JSON-LD, og:image). */
export function absoluteAssetUrl(path: string): string {
  return resolveAbsoluteAssetUrl(path, siteUrl);
}
