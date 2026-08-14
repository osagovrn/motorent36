import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/content/HomeContent";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, OTHER_LOCALES, PLACE_NAMES, type Locale } from "@/i18n/locales";
import { buildAlternates, canonicalFor } from "@/i18n/alternates";
import { lowestPricePerDay } from "@/data/catalog";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return OTHER_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const price = String(lowestPricePerDay());
  const places = PLACE_NAMES[locale];
  const title = dict.meta.defaultTitle
    .replace("{city}", places.city)
    .replace("{price}", price);
  const description = dict.meta.defaultDescription
    .replace("{cityIn}", places.cityIn)
    .replace(/\{price\}/g, price);
  const path = canonicalFor(locale, "/");

  return {
    title,
    description,
    alternates: { canonical: path, languages: buildAlternates("/") },
    openGraph: {
      title,
      description,
      url: path,
    },
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <HomeContent locale={locale} dict={getDictionary(locale)} />;
}
