import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingPanel } from "@/components/BookingPanel";
import { productMeta, SEO_CONFIG } from "@/config/seo";
import { parseImageUrls, prisma } from "@/lib/prisma";
import { formatRub } from "@/lib/rental";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Товар не найден" };
  const meta = productMeta({
    brand: product.brand ?? "шлем",
    model: product.model ?? product.title,
    price: product.pricePerDay,
  });
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { attributes: true, category: true },
  });

  if (!product) notFound();

  const images = parseImageUrls(product.imageUrls);
  const availableSizes = product.attributes
    .filter((a) => a.attributeName === "size" && a.stockQuantity > 0)
    .map((a) => a.attributeValue);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    image: images,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RUB",
      lowPrice: product.pricePerDay,
      highPrice: product.marketValue,
      offerCount: availableSizes.length,
      availability:
        availableSizes.length > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${SEO_CONFIG.siteUrl}/catalog/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80">
            {product.category?.name ?? "Товар"} · {SEO_CONFIG.city}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-none text-amber-50 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-zinc-400">
            {product.brand} {product.model}
            {product.color ? ` · ${product.color}` : ""}
          </p>

          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            {images[0] && (
              <Image
                src={images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-300">
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
            </ul>
          </div>
        </div>

        <BookingPanel
          productSlug={product.slug}
          productTitle={product.title}
          pricePerDay={product.pricePerDay}
          marketValue={product.marketValue}
          availableSizes={availableSizes}
        />
      </div>
    </div>
  );
}
