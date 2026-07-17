import Link from "next/link";
import { FAQ_ITEMS } from "@/config/seo";

type Props = {
  /** Показать ссылку «все вопросы» на /faq */
  withMoreLink?: boolean;
  limit?: number;
};

export function FaqSection({ withMoreLink, limit }: Props) {
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  return (
    <div>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/10 bg-zinc-950/50 open:border-amber-500/25"
          >
            <summary className="focus-ring cursor-pointer list-none rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-50 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-amber-500/80 transition group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-white/5 px-4 pb-4 pt-3 text-sm leading-relaxed text-zinc-400">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
      {withMoreLink && limit && FAQ_ITEMS.length > limit && (
        <p className="mt-4">
          <Link
            href="/faq"
            className="focus-ring rounded-sm text-sm font-semibold text-amber-400 hover:underline"
          >
            Все вопросы и ответы →
          </Link>
        </p>
      )}
    </div>
  );
}
