import { SEO_CONFIG } from "@/config/seo";
import { ALL_LOCALES, LOCALE_HREFLANG, localePath, type Locale } from "@/i18n/locales";

/**
 * Строит объект languages для Next Metadata.alternates — hreflang на
 * все локали + x-default (указывает на русскую, основную версию).
 * path — без локального префикса, начинается с "/".
 */
export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of ALL_LOCALES) {
    languages[LOCALE_HREFLANG[l]] = localePath(l, path);
  }
  languages["x-default"] = localePath("ru", path);
  return languages;
}

export function canonicalFor(locale: Locale, path: string): string {
  const p = localePath(locale, path);
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p : `${p}/`;
}

export function absoluteUrl(path: string): string {
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  return `${base}${path}`;
}
