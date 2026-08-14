import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { getAllProducts } from "@/data/catalog";
import { ALL_LOCALES, localePath } from "@/i18n/locales";
import { buildAlternates } from "@/i18n/alternates";

export const dynamic = "force-static";

/** Базовые пути сайта (без локального префикса) с приоритетами. */
const PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/faq/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/offer/", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const productPaths = getAllProducts().map((p) => ({
    path: `/catalog/${p.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const allPages = [...PAGES, ...productPaths];

  return allPages.flatMap(({ path, changeFrequency, priority }) =>
    ALL_LOCALES.map((locale) => ({
      url: `${base}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency,
      // Неглавные языки — тот же приоритет страницы, но слегка ниже,
      // чтобы поисковик явно понимал: ru — основная версия.
      priority: locale === "ru" ? priority : Math.round(priority * 0.9 * 100) / 100,
      alternates: { languages: buildAlternates(path) },
    })),
  );
}
