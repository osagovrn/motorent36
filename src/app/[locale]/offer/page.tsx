import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferContent } from "@/content/OfferContent";
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
  const path = canonicalFor(locale, "/offer/");
  return {
    title: dict.legal.offerPageTitle,
    alternates: { canonical: path, languages: buildAlternates("/offer/") },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleOfferPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <OfferContent locale={locale} dict={getDictionary(locale)} />;
}
