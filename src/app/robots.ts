import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  let host = "yvwvy.ru";
  try {
    host = new URL(SEO_CONFIG.siteUrl).host;
  } catch {
    /* keep default */
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
