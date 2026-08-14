import type { Metadata } from "next";
import { PrivacyContent } from "@/content/PrivacyContent";
import { getDictionary } from "@/i18n/dictionaries";
import { SEO_CONFIG } from "@/config/seo";
import { buildAlternates } from "@/i18n/alternates";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: `Политика обработки персональных данных ${SEO_CONFIG.brandName}.`,
  alternates: { canonical: "/privacy/", languages: buildAlternates("/privacy/") },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyContent locale="ru" dict={getDictionary("ru")} />;
}
