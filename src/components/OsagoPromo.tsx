import { SEO_CONFIG } from "@/config/seo";

/** Ненавязчивая кросс-реклама ОСАГО на сайте аренды */
export function OsagoPromo() {
  return (
    <aside className="border-t border-white/5" aria-label="Также: ОСАГО">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <a
          href={SEO_CONFIG.osagoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-zinc-900/40 px-5 py-5 transition hover:border-amber-500/25 hover:bg-zinc-900/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
        >
          <div className="min-w-0 border-l-2 border-amber-500/50 pl-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Полезно знать
            </p>
            <p className="mt-1.5 text-base font-medium text-zinc-100 sm:text-lg">
              Нужен полис ОСАГО или КАСКО?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              Онлайн-расчёт и оформление — тот же контакт, что и для аренды.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-amber-400/90 transition group-hover:text-amber-300 sm:self-center">
            Перейти
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      </div>
    </aside>
  );
}
