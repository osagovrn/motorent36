import type { Metadata } from "next";
import { ProductContent } from "@/content/ProductContent";
import { getAllProducts, getProductBySlug } from "@/data/catalog";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, canonicalFor } from "@/i18n/alternates";
import { PLACE_NAMES } from "@/i18n/locales";
import { absoluteAssetUrl } from "@/lib/assets";
import { formatRub } from "@/lib/rental";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dict = getDictionary("ru");
  const product = getProductBySlug(slug);
  if (!product) return { title: dict.meta.productNotFound };

  const sizePart = "";
  const sizesText =
    product.sizes.length > 0 ? `Размеры ${product.sizes.join(" и ")}.` : "";
  const title = dict.meta.productTitle(
    product.brand,
    product.model,
    sizePart,
    PLACE_NAMES.ru.cityIn,
    formatRub(product.pricePerDay),
  );
  const description = dict.meta.productDescription(
    product.brand,
    product.model,
    PLACE_NAMES.ru.cityIn,
    formatRub(product.pricePerDay),
    sizesText,
  );
  const path = canonicalFor("ru", `/catalog/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: path, languages: buildAlternates(`/catalog/${slug}`) },
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductContent slug={slug} locale="ru" dict={getDictionary("ru")} />;
}
