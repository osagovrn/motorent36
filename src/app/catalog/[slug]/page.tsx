import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactPanel } from "@/components/ContactPanel";
import { ProductImage } from "@/components/ProductImage";
import { getAllProducts, getProductBySlug } from "@/data/catalog";
import { productMeta, SEO_CONFIG } from "@/config/seo";
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
  });
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/catalog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/catalog/${slug}`,
      images: product.images[0]
        ? [{ url: absoluteAssetUrl(product.images[0]), alt: product.title }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const images = product.images;
  const availableSizes = product.sizes;
  const productUrl = `${SEO_CONFIG.siteUrl.replace(/\/$/, "")}/catalog/${product.slug}`;
  const absoluteImages = images.map((src) => absoluteAssetUrl(src));

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: absoluteImages,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.pricePerDay,
      priceValidUntil: "2027-12-31",
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80">
            {product.categoryName} · {SEO_CONFIG.city}
          </p>
          <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight text-amber-50 sm:text-4xl lg:text-5xl lg:leading-none">
            {product.title}
          </h1>
          <p className="mt-4 text-zinc-400">
            {product.brand} {product.model}
            {product.color ? ` · ${product.color}` : ""}
          </p>

          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            {images[0] && (
              <ProductImage
                src={images[0]}
                alt={product.title}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {images.slice(1).map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
                >
                  <ProductImage
                    src={src}
                    alt={`${product.title} — ракурс ${i + 2}`}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          )}

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
                className="text-amber-400 underline-offset-2 hover:underline"
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
    </div>
  );
}
