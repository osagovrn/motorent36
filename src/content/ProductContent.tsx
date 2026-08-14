import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";
import { ProductGallery } from "@/components/ProductGallery";
import { MobileBookBar } from "@/components/MobileBookBar";
import { getProductBySlug } from "@/data/catalog";
import { SEO_CONFIG } from "@/config/seo";
import { absoluteAssetUrl } from "@/lib/assets";
import { formatRub } from "@/lib/rental";
import { localePath, type Locale } from "@/i18n/locales";
import { localizeProduct } from "@/i18n/catalog-i18n";
import { resolveContactPanelLabels } from "@/i18n/resolve";
import type { Dict } from "@/i18n/types";

type Props = { slug: string; locale: Locale; dict: Dict };

export function ProductContent({ slug, locale, dict }: Props) {
  const rawProduct = getProductBySlug(slug);
  if (!rawProduct) notFound();
  const product = localizeProduct(rawProduct, locale);

  const images = product.images;
  const availableSizes = product.sizes;
  const base = SEO_CONFIG.siteUrl.replace(/\/$/, "");
  const productUrl = `${base}${localePath(locale, `/catalog/${product.slug}`)}/`;
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
      description: `${dict.product.rentLine(String(product.pricePerDay))}`,
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
        name: dict.product.breadcrumbHome,
        item: `${base}${localePath(locale, "/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.product.breadcrumbCatalog,
        item: `${base}${localePath(locale, "/")}#katalog`,
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
    <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={localePath(locale, "/")} className="focus-ring rounded-sm hover:text-amber-300">
              {dict.product.breadcrumbHome}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={localePath(locale, "/#katalog")}
              className="focus-ring rounded-sm hover:text-amber-300"
            >
              {dict.product.breadcrumbCatalog}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-zinc-400">{product.model}</li>
        </ol>
      </nav>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8 lg:items-start">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-500/80">
            {product.categoryName} · {SEO_CONFIG.locationLabel}
          </p>
          <h1 className="font-display mt-2 text-2xl font-extrabold leading-tight text-amber-50 sm:text-3xl">
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
                {dict.product.atPickup(formatRub(product.marketValue))}
              </strong>
              . {dict.product.atPickupNote}
            </p>
            <p>{product.description}</p>
            <ul className="list-disc space-y-1 pl-5 text-zinc-400">
              <li>{dict.product.rentLine(formatRub(product.pricePerDay))}</li>
              <li>{dict.product.marketLine(formatRub(product.marketValue))}</li>
              <li>{dict.product.depositNote(formatRub(product.marketValue))}</li>
              <li>{dict.product.bookingLine}</li>
            </ul>
            <p className="pt-1">
              <Link
                href={localePath(locale, "/faq")}
                className="focus-ring rounded-sm text-amber-400 underline-offset-2 hover:underline"
              >
                {dict.product.faqLink}
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
            locale={locale}
            labels={resolveContactPanelLabels(dict, {
              marketValue: formatRub(product.marketValue),
              availableSizesText: availableSizes.join(", ") || "—",
              contactName: SEO_CONFIG.contactName,
              phoneDisplay: SEO_CONFIG.phoneDisplay,
              maxDisplay: SEO_CONFIG.maxDisplay,
            })}
          />
        </div>
      </div>

      <MobileBookBar dict={dict} />
    </div>
  );
}
