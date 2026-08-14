import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductContent } from "@/content/ProductContent";
import { getAllProducts, getProductBySlug } from "@/data/catalog";
import { localizeProduct } from "@/i18n/catalog-i18n";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, OTHER_LOCALES, PLACE_NAMES, type Locale } from "@/i18n/locales";
import { buildAlternates, canonicalFor } from "@/i18n/alternates";
import { absoluteAssetUrl } from "@/lib/assets";
import { formatRub } from "@/lib/rental";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const products = getAllProducts();
  return OTHER_LOCALES.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const places = PLACE_NAMES[locale];
  const rawProduct = getProductBySlug(slug);
  if (!rawProduct) return { title: dict.meta.productNotFound };
  const product = localizeProduct(rawProduct, locale);

  const sizesText =
    product.sizes.length > 0 ? `${product.sizes.join(" / ")}` : "";
  const title = dict.meta.productTitle(
    product.brand,
    product.model,
    "",
    places.cityIn,
    formatRub(product.pricePerDay),
  );
  const description = dict.meta.productDescription(
    product.brand,
    product.model,
    places.cityIn,
    formatRub(product.pricePerDay),
    sizesText,
  );
  const path = canonicalFor(locale, `/catalog/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: buildAlternates(`/catalog/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: path,
      images: [
        {
          url: absoluteAssetUrl(product.images[0] ?? "/og.jpg"),
          width: 1200,
          height: 900,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function LocaleProductPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <ProductContent slug={slug} locale={locale} dict={getDictionary(locale)} />;
}
