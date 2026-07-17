import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactPanel } from "@/components/ContactPanel";
import { ProductGallery } from "@/components/ProductGallery";
import { MobileBookBar } from "@/components/MobileBookBar";
import { getAllProducts, getProductBySlug } from "@/data/catalog";
import { canonicalPath, productMeta, SEO_CONFIG } from "@/config/seo";
import { absoluteAssetUrl } from "@/lib/assets";
import { formatRub } from "@/lib/rental";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  const meta = productMeta({
    brand: product.brand,
    model: product.model,
    price: product.pricePerDay,
    sizes: product.sizes,
  });
  const path = canonicalPath(`/catalog/${slug}`);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      images: [
        {
          url: absoluteAssetUrl("/og.jpg"),
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const images = product.images;
  const availableSizes = product.sizes;
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  const productUrl = `${base}/catalog/${product.slug}/`;
  const absoluteImages = images.map((src) => absoluteAssetUrl(src));
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.categoryName,
    color: product.color,
    image: absoluteImages,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Размеры в наличии",
        value: availableSizes.join(", "),
      },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.pricePerDay,
      priceValidUntil,
      description: `Аренда за сутки. При получении передаётся ${product.marketValue} ₽ (прокат + возвратный залог). Бронь по телефону.`,
      availability:
        availableSizes.length > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: SEO_CONFIG.brandName,
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: `${base}/#katalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-14 lg:pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="focus-ring rounded-sm hover:text-amber-300">
              Главная
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href="/#katalog"
              className="focus-ring rounded-sm hover:text-amber-300"
            >
              Каталог
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-zinc-400">{product.model}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80">
            {product.categoryName} · {SEO_CONFIG.locationLabel}
          </p>
          <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight text-amber-50 sm:text-4xl lg:text-5xl lg:leading-none">
            {product.title}
          </h1>
          <p className="mt-4 text-zinc-400">
            {product.brand} {product.model}
            {product.color ? ` · ${product.color}` : ""}
          </p>

          <div className="mt-6">
            <ProductGallery images={images} alt={product.title} />
          </div>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-300">
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-amber-50">
              <strong className="font-semibold">
                При встрече — {formatRub(product.marketValue)} ₽
              </strong>
              . Из них прокат за выбранные сутки, остальное — залог. Залог
              возвращаем при сдаче шлема в порядке.
            </p>
            <p>{product.description}</p>
            <ul className="list-disc space-y-1 pl-5 text-zinc-400">
              <li>Прокат: {formatRub(product.pricePerDay)} ₽ / сутки</li>
              <li>
                Рыночная стоимость (обеспечение):{" "}
                {formatRub(product.marketValue)} ₽
              </li>
              <li>
                При встрече всегда передаёте{" "}
                {formatRub(product.marketValue)} ₽ — разница возвращается как
                залог
              </li>
              <li>Бронь по телефону, Telegram или MAX</li>
            </ul>
            <p className="pt-1">
              <Link
                href="/faq"
                className="focus-ring rounded-sm text-amber-400 underline-offset-2 hover:underline"
              >
                FAQ: размеры, залог, встреча →
              </Link>
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:sticky lg:top-[calc(4.75rem+env(safe-area-inset-top))] lg:self-start">
          <ContactPanel
            productTitle={product.title}
            pricePerDay={product.pricePerDay}
            marketValue={product.marketValue}
            availableSizes={availableSizes}
          />
        </div>
      </div>

      <MobileBookBar />
    </div>
  );
}
