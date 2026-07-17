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
import { OsagoPromo } from "@/components/OsagoPromo";
import { HeroPreload } from "@/components/HeroPreload";
import { LocationMap } from "@/components/LocationMap";

export default function HomePage() {
  const products = getAllProducts();
  const fromPrice = lowestPricePerDay();
  const sample = products[0];
  const sampleMarket = sample?.marketValue ?? 6000;
  const sampleDayDeposit = Math.max(
    0,
    sampleMarket - (sample?.pricePerDay ?? 500),
  );
  const sampleSizes = sample?.sizes ?? ["M", "L"];
  const heroImage = sample?.images[0] ?? "/products/jk902-1.jpg";
  const bookHref = sample
    ? `/catalog/${sample.slug}/#bron`
    : "/#katalog";

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.siteUrl.replace(/\/$/, "")}/#business`,
    name: SEO_CONFIG.brandName,
    description: SEO_CONFIG.defaultDescription,
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
    sameAs: [SEO_CONFIG.telegram, SEO_CONFIG.maxUrl, SEO_CONFIG.osagoUrl],
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

      <section className="relative min-h-[min(72dvh,36rem)] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950" aria-hidden>
          <ProductImage
            src={heroImage}
            alt=""
            priority
            className="hero-ken bg-zinc-950 object-cover object-[center_42%] opacity-100"
            sizes="100vw"
          />
          {/* Затемнение слева под текст; справа шлем остаётся читаемым */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 from-15% via-zinc-950/75 via-45% to-zinc-950/15 to-75% sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 from-5% via-transparent to-zinc-950/50" />
          <div className="hero-grain absolute inset-0 opacity-[0.18]" />
        </div>

        <div className="relative mx-auto flex min-h-[min(72dvh,36rem)] max-w-6xl flex-col justify-end px-4 pb-8 pt-14 sm:justify-center sm:px-6 sm:pb-10 sm:pt-16">
          <p className="reveal reveal-1 font-display text-4xl font-extrabold tracking-tight text-amber-50 sm:text-5xl lg:text-6xl">
            {SEO_CONFIG.brandName}
          </p>
          <h1 className="reveal reveal-2 mt-1.5 max-w-2xl text-lg font-semibold leading-snug text-amber-100/95 sm:mt-2 sm:text-xl lg:text-2xl">
            Аренда мотошлема {SEO_CONFIG.cityInFormat}
          </h1>
          <p className="reveal reveal-3 mt-2 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
            JIEKAI JK902, размеры {sampleSizes.join(" и ")}, от{" "}
            <strong className="font-semibold text-amber-100">
              {formatRub(fromPrice)} ₽/сутки
            </strong>
            . Рассчитайте даты на сайте — удобно написать в Telegram или позвонить.
          </p>
          <div className="reveal reveal-4 mt-4 flex w-full max-w-md flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${SEO_CONFIG.phoneE164}`}
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400 sm:w-auto"
            >
              Позвонить
            </a>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-amber-100 hover:border-amber-400 hover:bg-amber-500/25 sm:w-auto"
            >
              Telegram
            </a>
            <a
              href={SEO_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-center text-sm font-semibold text-zinc-200 hover:border-amber-500/40 sm:w-auto"
            >
              MAX
            </a>
          </div>
        </div>
      </section>

      <section id="kak-eto-rabotaet" className="section-wash border-y border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
          <h2 className="font-display text-2xl text-amber-50 sm:text-3xl">
            Как это работает
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
            Три шага до поездки — без онлайн-оплаты и без сюрпризов по залогу.
          </p>
          <ol className="mt-5 max-w-3xl space-y-3">
            {[
              {
                title: "Звонок или сообщение",
                text: `Выбираете шлем и размер (${sampleSizes.join(" или ")}), считаете даты на сайте. Звоните или пишите в Telegram / MAX — подтвердим бронь.`,
              },
              {
                title: "Встреча",
                text: `Встречаемся в мкр. ${SEO_CONFIG.locality} (рядом с ${SEO_CONFIG.landmark}), ${SEO_CONFIG.street}: примеряете шлем. Для договора нужен паспорт или водительское удостоверение (фото документов на месте).`,
              },
              {
                title: "Оплата и залог",
                text: `Передаёте полную стоимость шлема (${formatRub(sampleMarket)} ₽). При возврате в надлежащем состоянии возвращаем залог (${formatRub(sampleDayDeposit)} ₽ при аренде на 1 сутки).`,
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-2.5 sm:gap-3">
                <span className="font-display w-8 shrink-0 text-xl text-amber-500/90 sm:w-9 sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 border-l border-amber-500/25 pl-2.5 sm:pl-3">
                  <h3 className="text-base font-semibold text-amber-50">
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

      <LocationMap />

      <section id="katalog" className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
        <h2 className="font-display text-2xl text-amber-50 sm:text-3xl">
          Каталог
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400">
          Сейчас в прокате — закрытый модульный шлем JIEKAI JK902.
        </p>

        <div
          className={
            products.length === 1
              ? "mt-4 max-w-xl"
              : products.length === 2
                ? "mt-4 grid gap-4 sm:grid-cols-2"
                : "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {products.map((product) => (
            <article
              key={product.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50"
            >
              <Link href={`/catalog/${product.slug}`} className="block">
                <div className="relative aspect-[5/3] overflow-hidden bg-zinc-100">
                  {product.images[0] ? (
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      className="bg-zinc-100 transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      Нет фото
                    </div>
                  )}
                </div>
                <div className="p-3.5 sm:p-4">
                  <p className="text-xs uppercase tracking-wider text-amber-500/80">
                    {product.categoryName}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-amber-50">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    от {formatRub(product.pricePerDay)} ₽/сутки · размеры{" "}
                    {product.sizes.join(", ") || "—"}
                  </p>
                  <span className="mt-2 inline-block text-sm font-semibold text-amber-400 group-hover:underline">
                    Узнать и позвонить →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div
          id="kogda-nuzhen"
          className="mt-7 border-t border-white/10 pt-6"
        >
          <h3 className="font-display text-xl text-amber-50 sm:text-2xl">
            Когда нужна аренда шлема
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
            Посуточный прокат — когда свой шлем ещё не купили, он не подошёл
            по размеру или нужен только на короткий срок.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2.5">
            {[
              {
                title: "Экзамен в ГИБДД на категорию A",
                text: "На площадке и в городе требуется закрытый шлем. Аренда на день экзамена — проще и дешевле, чем покупать экипировку «на всякий случай».",
              },
              {
                title: "Поездка вдвоём — шлем для пассажира",
                text: "Выезд с девушкой, другом или родственником: у водителя свой шлем есть, а второму нужен только на эту поездку. Взяли на сутки — и оба в защите.",
              },
              {
                title: "Первые километры без своей экипировки",
                text: "Только получили права или сели на мотоцикл впервые. Пока выбираете модель «навсегда», удобно покататься в прокатном шлеме и понять размер.",
              },
              {
                title: "Гости и короткие визиты в город",
                text: "Друзья приехали в Воронеж и хотят проехаться с вами. Не обязательно дарить им шлем — достаточно аренды на выходные.",
              },
              {
                title: "Свой шлем недоступен",
                text: "Забыли дома, отдали в чистку или ремонт, разбили визор перед выездом. Аренда выручает, чтобы не отменять запланированную поездку.",
              },
              {
                title: "Однодневный выезд или мотопрогулка",
                text: "Загородная дорога, фотосессия, встреча клуба — когда шлем нужен на часы или сутки, а не как постоянная покупка.",
              },
            ].map((item, i) => (
              <li key={item.title} className="flex gap-2.5 sm:gap-3">
                <span className="font-display w-7 shrink-0 text-lg text-amber-500/90 sm:w-8 sm:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 border-l border-amber-500/25 pl-2.5 sm:pl-3">
                  <p className="text-sm font-semibold text-amber-50 sm:text-base">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-zinc-400">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="section-wash border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
          <h2 className="font-display text-2xl text-amber-50 sm:text-3xl">
            Частые вопросы
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
            Размер, залог, встреча и документы — коротко перед звонком.
          </p>
          <div className="mt-4 max-w-3xl">
            <FaqSection withMoreLink limit={4} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7">
          <div>
            <h2 className="font-display text-xl text-amber-50 sm:text-2xl">
              Готовы взять шлем?
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              Посчитайте даты на карточке товара — удобнее всего написать в
              Telegram или позвонить.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <a
              href={`tel:${SEO_CONFIG.phoneE164}`}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
            >
              Позвонить
            </a>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex min-h-11 w-full items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-5 text-center text-sm font-bold uppercase tracking-wide text-amber-100 hover:border-amber-400 hover:bg-amber-500/25 sm:w-auto"
            >
              Telegram
            </a>
            <Link
              href={bookHref}
              className="focus-ring flex min-h-11 w-full items-center justify-center rounded-xl border border-white/20 px-5 text-center text-sm font-semibold uppercase tracking-wide text-zinc-100 hover:border-amber-500/50 sm:w-auto"
            >
              К бронированию
            </Link>
          </div>
        </div>
      </section>

      <OsagoPromo />
    </>
  );
}
