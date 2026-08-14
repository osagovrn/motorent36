import type { Metadata } from "next";
import { OfferContent } from "@/content/OfferContent";
import { getDictionary } from "@/i18n/dictionaries";
import { SEO_CONFIG } from "@/config/seo";
import { buildAlternates } from "@/i18n/alternates";

export const metadata: Metadata = {
  title: "Договор-оферта проката",
  description: `Публичная оферта проката ${SEO_CONFIG.brandName} ${SEO_CONFIG.cityInFormat}.`,
  alternates: { canonical: "/offer/", languages: buildAlternates("/offer/") },
  robots: { index: true, follow: true },
};

export default function OfferPage() {
  return <OfferContent locale="ru" dict={getDictionary("ru")} />;
}
