import Link from "next/link";
import type { FaqItem } from "@/i18n/types";
import { localePath, type Locale } from "@/i18n/locales";

type Props = {
  items: FaqItem[];
  withMoreLink?: boolean;
  limit?: number;
  locale: Locale;
  moreLabel: string;
};

export function FaqSection({ items, withMoreLink, limit, locale, moreLabel }: Props) {
  const shown = limit ? items.slice(0, limit) : items;

  return (
    <div>
      <div className="space-y-2">
        {shown.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-white/10 bg-zinc-950/50 open:border-amber-500/25"
          >
            <summary className="focus-ring cursor-pointer list-none rounded-xl px-3 py-2.5 text-sm font-semibold text-amber-50 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-2">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-amber-500/80 transition group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-white/5 px-3 pb-3 pt-2 text-sm leading-snug text-zinc-400">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
      {withMoreLink && limit && items.length > limit && (
        <p className="mt-3">
          <Link
            href={localePath(locale, "/faq/")}
            className="focus-ring rounded-sm text-sm font-semibold text-amber-400 hover:underline"
          >
            {moreLabel}
          </Link>
        </p>
      )}
    </div>
  );
}
