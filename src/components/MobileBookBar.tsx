import { SEO_CONFIG } from "@/config/seo";

type Props = {
  /** Ссылка на блок брони (якорь на странице товара) */
  bookHref?: string;
};

/** Липкая панель звонка на мобильных (карточка товара). */
export function MobileBookBar({ bookHref = "#bron" }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-zinc-950/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-amber-500 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
        >
          Позвонить
        </a>
        <a
          href={SEO_CONFIG.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 text-sm font-bold uppercase tracking-wide text-amber-100"
        >
          Telegram
        </a>
        <a
          href={bookHref}
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-amber-500/40 px-3 text-sm font-semibold text-amber-200"
        >
          Даты
        </a>
      </div>
    </div>
  );
}
