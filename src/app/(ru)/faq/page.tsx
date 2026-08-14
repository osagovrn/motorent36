import type { Metadata } from "next";
import { FaqContent } from "@/content/FaqContent";
import { getDictionary } from "@/i18n/dictionaries";
import { SEO_CONFIG } from "@/config/seo";
import { buildAlternates } from "@/i18n/alternates";

export const metadata: Metadata = {
  title: "Частые вопросы о прокате",
  description: `Ответы про размеры, залог, встречу и бронирование проката ${SEO_CONFIG.cityInFormat} — ${SEO_CONFIG.brandName}.`,
  alternates: { canonical: "/faq/", languages: buildAlternates("/faq/") },
  openGraph: {
    title: `FAQ — прокат ${SEO_CONFIG.cityInFormat}`,
    description: `Размеры, залог, встреча, документы. ${SEO_CONFIG.brandName}.`,
    url: "/faq/",
  },
};

export default function FaqPage() {
  return <FaqContent locale="ru" dict={getDictionary("ru")} />;
}
