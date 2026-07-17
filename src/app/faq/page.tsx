import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { HelmetSizeChart } from "@/components/HelmetSizeChart";
import { FAQ_ITEMS, SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Частые вопросы об аренде мотошлемов",
  description: `Ответы про размеры, залог, встречу и бронирование проката шлемов ${SEO_CONFIG.cityInFormat} — ${SEO_CONFIG.brandName}.`,
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: `FAQ — аренда мотошлемов ${SEO_CONFIG.cityInFormat}`,
    description: `Размеры, залог, встреча, документы. ${SEO_CONFIG.brandName}.`,
    url: "/faq/",
  },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <Link href="/" className="text-sm text-amber-400 hover:underline">
        ← На главную
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-amber-50 sm:text-4xl">
        Частые вопросы
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Аренда мотошлемов {SEO_CONFIG.cityInFormat} · {SEO_CONFIG.brandName}
      </p>

      <div className="mt-8">
        <FaqSection />
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="font-display text-xl text-amber-50">Таблица размеров</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Измерьте голову сантиметром над бровями и ушами.
        </p>
        <HelmetSizeChart className="mt-4" />
      </section>

      <p className="mt-8 text-sm text-zinc-500">
        Не нашли ответ?{" "}
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="text-amber-400 hover:underline"
        >
          {SEO_CONFIG.phoneDisplay}
        </a>{" "}
        или{" "}
        <a
          href={SEO_CONFIG.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:underline"
        >
          Telegram
        </a>
        .
      </p>
    </article>
  );
}
