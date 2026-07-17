import { SEO_CONFIG } from "@/config/seo";

/** Кросс-реклама ОСАГО / КАСКО на сайте аренды */
export function OsagoPromo() {
  return (
    <aside
      className="relative overflow-hidden border-y border-amber-500/25"
      aria-label="Также: ОСАГО"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_85%_50%,rgba(245,158,11,0.18),transparent_55%),linear-gradient(180deg,rgba(245,158,11,0.06),transparent_40%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-amber-500/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <a
          href={SEO_CONFIG.osagoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group focus-ring relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/[0.12] via-zinc-950 to-zinc-950 px-5 py-6 shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_20px_50px_-28px_rgba(245,158,11,0.45)] transition hover:border-amber-300/55 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.2),0_24px_56px_-24px_rgba(245,158,11,0.55)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-7"
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl transition group-hover:bg-amber-400/20"
            aria-hidden
          />

          <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-500/15 text-amber-300 shadow-[inset_0_1px_0_rgba(253,230,138,0.15)] sm:h-14 sm:w-14"
              aria-hidden
            >
              <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
                <path
                  d="M16 4l10 4v8c0 6.5-4.2 11.2-10 13-5.8-1.8-10-6.5-10-13V8l10-4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 16.5l3 3 6-6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
                Ещё от нас · {SEO_CONFIG.osagoLabel}
              </p>
              <p className="font-display mt-1.5 text-xl font-bold leading-snug text-amber-50 sm:text-2xl">
                ОСАГО и КАСКО — онлайн
              </p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-400">
                Тот же контакт, что и для аренды шлема. Считаете полис на сайте
                — оформляете без очередей.
              </p>
            </div>
          </div>

          <span className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-amber-500 px-5 text-sm font-bold uppercase tracking-wide text-zinc-950 shadow-[0_8px_24px_-8px_rgba(245,158,11,0.7)] transition group-hover:bg-amber-400 group-hover:shadow-[0_10px_28px_-6px_rgba(245,158,11,0.85)] sm:self-center">
            Рассчитать полис
            <span
              aria-hidden
              className="transition group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </a>
      </div>
    </aside>
  );
}
