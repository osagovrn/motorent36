import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyContent } from "@/content/PrivacyContent";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, OTHER_LOCALES, type Locale } from "@/i18n/locales";
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
  const path = canonicalFor(locale, "/privacy/");
  return {
    title: dict.legal.privacyPageTitle,
    alternates: { canonical: path, languages: buildAlternates("/privacy/") },
    robots: { index: true, follow: true },
  };
}

export default async function LocalePrivacyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <PrivacyContent locale={locale} dict={getDictionary(locale)} />;
}
