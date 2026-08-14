import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { HelmetSizeChart } from "@/components/HelmetSizeChart";
import { SEO_CONFIG } from "@/config/seo";
import { localePath, PLACE_NAMES, type Locale } from "@/i18n/locales";
import type { Dict } from "@/i18n/types";

type Props = { locale: Locale; dict: Dict };

export function FaqContent({ locale, dict }: Props) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
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

      <Link href={localePath(locale, "/")} className="text-sm text-amber-400 hover:underline">
        {dict.faq.backHome}
      </Link>
      <h1 className="font-display mt-4 text-2xl font-extrabold text-amber-50 sm:text-3xl">
        {dict.faq.pageTitle}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        {dict.faq.pageIntro(PLACE_NAMES[locale].cityIn)}
      </p>

      <div className="mt-8">
        <FaqSection items={dict.faq.items} locale={locale} moreLabel={dict.faq.moreLink} />
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="font-display text-xl text-amber-50">{dict.faq.sizeChartTitle}</h2>
        <p className="mt-1 text-sm text-zinc-400">{dict.faq.sizeChartNote}</p>
        <HelmetSizeChart className="mt-4" />
      </section>

      <p className="mt-8 text-sm text-zinc-500">
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="text-amber-400 hover:underline"
        >
          {SEO_CONFIG.phoneDisplay}
        </a>{" "}
        ·{" "}
        <a
          href={SEO_CONFIG.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:underline"
        >
          Telegram
        </a>
      </p>
    </article>
  );
}
