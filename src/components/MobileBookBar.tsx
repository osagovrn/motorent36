import { SEO_CONFIG } from "@/config/seo";
import type { Dict } from "@/i18n/types";

type Props = {
  /** Ссылка на блок брони (якорь на странице товара) */
  bookHref?: string;
  /** Показать кнопку «Даты» (на карточке товара) */
  showDates?: boolean;
  dict: Dict;
};

/**
 * Липкая панель на мобильных: звонок + Telegram (+ даты на товаре).
 * safe-area для iPhone с «чёлкой»/Home Indicator.
 */
export function MobileBookBar({
  bookHref = "#bron",
  showDates = true,
  dict,
}: Props) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-zinc-950/95 px-3 pt-2 backdrop-blur-md lg:hidden"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-6xl gap-2">
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-amber-500 px-2 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400 active:scale-[0.98]"
          aria-label={`${dict.mobileBar.call} ${SEO_CONFIG.phoneDisplay}`}
        >
          {dict.mobileBar.call}
        </a>
        <a
          href={SEO_CONFIG.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-2 text-center text-sm font-bold uppercase tracking-wide text-amber-100 active:scale-[0.98]"
          aria-label={dict.nav.telegramWrite}
        >
          {dict.mobileBar.telegram}
        </a>
        {showDates ? (
          <a
            href={bookHref}
            className="focus-ring inline-flex min-h-12 min-w-[4.5rem] items-center justify-center rounded-xl border border-amber-500/40 px-3 text-sm font-semibold text-amber-200 active:scale-[0.98]"
          >
            {dict.mobileBar.dates}
          </a>
        ) : null}
      </div>
    </div>
  );
}
