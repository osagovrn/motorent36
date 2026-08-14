import Link from "next/link";
import {
  getAllProducts,
  lowestPricePerDay,
} from "@/data/catalog";
import { SEO_CONFIG } from "@/config/seo";
import { absoluteAssetUrl } from "@/lib/assets";
import { formatRub } from "@/lib/rental";
import { ProductImage } from "@/components/ProductImage";
import { FaqSection } from "@/components/FaqSection";
import { MoreInVoronezh } from "@/components/MoreInVoronezh";
import { HeroPreload } from "@/components/HeroPreload";
import { LocationMap } from "@/components/LocationMap";
import { MobileBookBar } from "@/components/MobileBookBar";
import { localePath, PLACE_NAMES, type Locale } from "@/i18n/locales";
import { localizeProduct } from "@/i18n/catalog-i18n";
import type { Dict } from "@/i18n/types";

type Props = { locale: Locale; dict: Dict };

export function HomeContent({ locale, dict }: Props) {
  const places = PLACE_NAMES[locale];
  const products = getAllProducts().map((p) => localizeProduct(p, locale));
  const fromPrice = lowestPricePerDay();
  const sample = products[0];
  const sampleMarket = sample?.marketValue ?? 6000;
  const sampleDayDeposit = Math.max(
    0,
    sampleMarket - (sample?.pricePerDay ?? 500),
  );
  const heroImage = sample?.images[0] ?? "/products/jk902-1.jpg";
  const bookHref = sample
    ? localePath(locale, `/catalog/${sample.slug}/#bron`)
    : localePath(locale, "/#katalog");

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.siteUrl.replace(/\/$/, "")}/#business`,
    name: SEO_CONFIG.brandName,
    description: dict.meta.defaultDescription
      .replace("{cityIn}", places.cityIn)
      .replace("{price}", String(fromPrice)),
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.phoneE164,
    email: SEO_CONFIG.email,
    image: absoluteAssetUrl("/og.jpg"),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO_CONFIG.mapLat,
      longitude: SEO_CONFIG.mapLon,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO_CONFIG.city,
      addressRegion: "Воронежская область",
      addressCountry: "RU",
      streetAddress: `${SEO_CONFIG.street} (мкр. ${SEO_CONFIG.locality})`,
    },
    areaServed: {
      "@type": "City",
      name: SEO_CONFIG.city,
    },
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Bank Transfer",
    sameAs: [SEO_CONFIG.telegram, SEO_CONFIG.maxUrl],
    openingHours: "Mo-Su",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Встреча",
        value: SEO_CONFIG.address,
      },
    ],
  };

  return (
    <>
      <HeroPreload src={heroImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />

      <section className="relative min-h-[min(42dvh,22rem)] overflow-hidden sm:min-h-[min(48dvh,26rem)]">
        <div className="absolute inset-0 bg-zinc-950" aria-hidden>
          <ProductImage
            src={heroImage}
            alt=""
            priority
            className="hero-ken bg-zinc-950 object-cover object-[80%_38%] opacity-75 sm:object-[75%_40%] scale-95 sm:scale-[0.92]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 from-25% via-zinc-950/90 via-55% to-zinc-950/40 to-85% sm:via-zinc-950/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 from-5% via-transparent to-zinc-950/50" />
          <div className="hero-grain absolute inset-0 opacity-[0.18]" />
        </div>

        <div className="relative mx-auto flex min-h-[min(42dvh,22rem)] max-w-6xl flex-col justify-end px-4 pb-6 pt-12 sm:min-h-[min(48dvh,26rem)] sm:justify-center sm:px-6 sm:pb-10 sm:pt-14">
          <p className="reveal reveal-1 font-display text-2xl font-extrabold tracking-tight text-amber-50 sm:text-3xl md:text-4xl">
            {SEO_CONFIG.brandName}
          </p>
          <h1 className="reveal reveal-2 mt-2 max-w-2xl text-lg font-semibold leading-snug text-amber-100/95 sm:text-xl">
            {dict.hero.title(places.cityIn)}
          </h1>
          <p className="reveal reveal-3 mt-2 max-w-lg text-sm leading-snug text-zinc-300 sm:text-base">
            {dict.hero.subtitle}{" "}
            <strong className="font-semibold text-amber-100">
              {formatRub(fromPrice)}
            </strong>{" "}
            {dict.hero.fromPrice("").trim()}
          </p>
          <div className="reveal reveal-4 mt-5 flex w-full max-w-md flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${SEO_CONFIG.phoneE164}`}
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400 sm:w-auto"
            >
              {dict.hero.call}
            </a>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-amber-100 hover:border-amber-400 hover:bg-amber-500/25 sm:w-auto"
            >
              {dict.hero.telegram}
            </a>
            <a
              href={SEO_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-zinc-200 hover:border-amber-500/40 sm:w-auto"
            >
              {dict.hero.max}
            </a>
          </div>
        </div>
      </section>

      <section id="kak-eto-rabotaet" className="section-wash border-y border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <h2 className="font-display text-2xl text-amber-50 sm:text-3xl">
            {dict.howItWorks.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            {dict.howItWorks.subtitle}
          </p>
          <ol className="mt-5 max-w-3xl space-y-4">
            {[
              { title: dict.howItWorks.step1Title, text: dict.howItWorks.step1Text },
              {
                title: dict.howItWorks.step2Title,
                text: dict.howItWorks.step2Text(
                  places.locality,
                  places.landmark,
                  places.street,
                ),
              },
              {
                title: dict.howItWorks.step3Title,
                text: dict.howItWorks.step3Text(
                  formatRub(sampleMarket),
                  formatRub(sampleDayDeposit),
                ),
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="font-display w-7 shrink-0 text-lg text-amber-500/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 border-l border-amber-500/20 pl-3">
                  <h3 className="text-sm font-semibold text-amber-50 sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-snug text-zinc-400">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LocationMap dict={dict} locale={locale} />

      <section id="katalog" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <h2 className="font-display text-xl text-amber-50 sm:text-2xl">
          {dict.catalog.title}
        </h2>
        <p className="mt-0.5 text-sm text-zinc-400">{dict.catalog.subtitle}</p>

        <div
          className={
            products.length === 1
              ? "mt-4 max-w-sm"
              : products.length === 2
                ? "mt-4 grid gap-3 sm:grid-cols-2 max-w-2xl"
                : "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {products.map((product) => (
            <article
              key={product.slug}
              className="group overflow-hidden rounded-lg border border-white/10 bg-zinc-900/50"
            >
              <Link href={localePath(locale, `/catalog/${product.slug}`)} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  {product.images[0] ? (
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      className="bg-zinc-100 object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
                      {dict.catalog.noPhoto}
                    </div>
                  )}
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-amber-500/80">
                    {product.categoryName}
                  </p>
                  <h3 className="mt-0.5 text-sm font-semibold leading-snug text-amber-50 sm:text-base">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    {dict.catalog.from} {formatRub(product.pricePerDay)} {dict.catalog.perDay} · {product.sizes.join(", ") || "—"}
                  </p>
                  <span className="mt-1 inline-block text-xs font-semibold text-amber-400 group-hover:underline">
                    {dict.catalog.more}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div id="kogda-nuzhen" className="mt-8 border-t border-white/10 pt-6">
          <h3 className="font-display text-xl text-amber-50 sm:text-2xl">
            {dict.whenNeeded.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            {dict.whenNeeded.subtitle}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {dict.whenNeeded.items.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-white/10 bg-zinc-950/40 px-3.5 py-3"
              >
                <p className="text-sm font-semibold text-amber-50">{item.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-zinc-400">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section-wash border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <h2 className="font-display text-2xl text-amber-50 sm:text-3xl">
            {dict.faq.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">{dict.faq.subtitle}</p>
          <div className="mt-4 max-w-3xl">
            <FaqSection
              items={dict.faq.items}
              withMoreLink
              limit={3}
              locale={locale}
              moreLabel={dict.faq.moreLink}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10">
          <div>
            <h2 className="font-display text-xl text-amber-50 sm:text-2xl">
              {dict.finalCta.title}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              {dict.finalCta.subtitle}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`tel:${SEO_CONFIG.phoneE164}`}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
            >
              {dict.finalCta.call}
            </a>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex min-h-12 w-full items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-5 text-center text-sm font-bold uppercase tracking-wide text-amber-100 hover:border-amber-400 hover:bg-amber-500/25 sm:w-auto"
            >
              {dict.finalCta.telegram}
            </a>
            <Link
              href={bookHref}
              className="focus-ring flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 px-5 text-center text-sm font-semibold uppercase tracking-wide text-zinc-100 hover:border-amber-500/50 sm:w-auto"
            >
              {dict.finalCta.toBooking}
            </Link>
          </div>
        </div>
      </section>

      <MoreInVoronezh dict={dict} />
      <MobileBookBar showDates={false} dict={dict} />
    </>
  );
}
