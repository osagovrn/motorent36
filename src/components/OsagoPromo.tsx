import { SEO_CONFIG } from "@/config/seo";

/** Кросс-реклама ОСАГО на сайте аренды */
export function OsagoPromo() {
  return (
    <aside
      className="border-t border-white/5 bg-zinc-900/60"
      aria-label="Реклама ОСАГО"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/80">
            Также от нас
          </p>
          <h2 className="font-display mt-2 text-xl text-amber-50 sm:text-2xl">
            Оформить ОСАГО и КАСКО онлайн
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Расчёт за минуты, электронный полис, помощь по телефону — тот же
            контакт, что и для аренды шлема.
          </p>
        </div>
        <a
          href={SEO_CONFIG.osagoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-center text-sm font-semibold text-amber-100 hover:bg-amber-500/20"
        >
          {SEO_CONFIG.osagoLabel} →
        </a>
      </div>
    </aside>
  );
}
