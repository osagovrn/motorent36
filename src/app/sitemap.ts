import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  const products = await prisma.product.findMany({
    select: { slug: true, createdAt: true },
  });

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/offer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...products.map((p) => ({
      url: `${base}/catalog/${p.slug}`,
      lastModified: p.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
