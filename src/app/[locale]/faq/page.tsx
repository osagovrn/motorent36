import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqContent } from "@/content/FaqContent";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, OTHER_LOCALES, PLACE_NAMES, type Locale } from "@/i18n/locales";
import { buildAlternates, canonicalFor } from "@/i18n/alternates";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return OTHER_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const path = canonicalFor(locale, "/faq/");
  return {
    title: dict.faq.pageTitle,
    description: dict.faq.pageIntro(PLACE_NAMES[locale].cityIn),
    alternates: { canonical: path, languages: buildAlternates("/faq/") },
    openGraph: { title: dict.faq.pageTitle, url: path },
  };
}

export default async function LocaleFaqPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <FaqContent locale={locale} dict={getDictionary(locale)} />;
}
