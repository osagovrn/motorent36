import Image from "next/image";
import Link from "next/link";
import { prisma, parseImageUrls } from "@/lib/prisma";
import { SEO_CONFIG } from "@/config/seo";
import { formatRub } from "@/lib/rental";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      attributes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO_CONFIG.brandName,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.phoneE164,
    email: SEO_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO_CONFIG.city,
      addressCountry: "RU",
    },
    areaServed: SEO_CONFIG.city,
    priceRange: "₽₽",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />

      <section className="hero-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><path d=%22M0 40L40 0H20L0 20zm40 0V20L20 40z%22 fill=%22%23ffffff%22 fill-opacity=%220.02%22/></svg>')]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90">
            {SEO_CONFIG.city} · самозанятый
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] text-amber-50 sm:text-7xl">
            Аренда мотошлемов
            <span className="block text-amber-400">в Воронеже</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Витрина и онлайн-бронирование. Оплата и залог — при личной встрече.
            Старт каталога: JIEKAI JK902, размеры M и L, от{" "}
            <strong className="text-amber-100">500 ₽/сутки</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#katalog"
              className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
            >
              Смотреть каталог
            </Link>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      <section id="kak-eto-rabotaet" className="border-y border-white/5 bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl text-amber-50 sm:text-4xl">
            Как это работает
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Три шага до поездки — без онлайн-оплаты и без сюрпризов по залогу.
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Бронирование",
                text: "Выбираете шлем, размер (M или L) и даты на сайте. Мы связываемся с вами по телефону или в Telegram.",
              },
              {
                title: "Встреча",
                text: "Встречаемся в Воронеже, вы примеряете шлем. Для договора нужен паспорт или водительское удостоверение (фото документов на месте).",
              },
              {
                title: "Оплата и залог",
                text: "Передаёте полную стоимость шлема (6 000 ₽). При возврате в надлежащем состоянии мгновенно возвращаем залог (5 500 ₽ при аренде на 1 сутки).",
              },
            ].map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5"
              >
                <span className="font-display text-3xl text-amber-500/80">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-amber-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="katalog" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl text-amber-50 sm:text-4xl">
          Каталог
        </h2>
        <p className="mt-2 text-zinc-400">
          Этап 1 — мотошлемы. Каталог расширяется без смены структуры данных.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const images = parseImageUrls(product.imageUrls);
            const sizes = product.attributes
              .filter((a) => a.attributeName === "size" && a.stockQuantity > 0)
              .map((a) => a.attributeValue);

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50"
              >
                <Link href={`/catalog/${product.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                    {images[0] ? (
                      <Image
                        src={images[0]}
                        alt={product.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-500">
                        Нет фото
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-amber-500/80">
                      {product.category?.name ?? "Каталог"}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-amber-50">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      от {formatRub(product.pricePerDay)} ₽/сутки · размеры{" "}
                      {sizes.join(", ") || "—"}
                    </p>
                    <span className="mt-4 inline-block text-sm font-semibold text-amber-400 group-hover:underline">
                      Забронировать →
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
