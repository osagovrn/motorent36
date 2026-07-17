import type { Metadata } from "next";
import Link from "next/link";
import { LOGO_OPTIONS } from "@/components/LogoMarks";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
  title: "Выбор логотипа",
  robots: { index: false, follow: false },
};

export default function LogoPreviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm text-amber-400 hover:underline">
        ← На главную
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-amber-50 sm:text-4xl">
        Варианты значка
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Как будет рядом с «{SEO_CONFIG.brandName}» в шапке. Напишите в чат
        букву A–E — поставлю выбранный в сайт.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LOGO_OPTIONS.map(({ id, name, note, Mark }) => (
          <article
            key={id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-2xl text-amber-400">{id}</p>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                {name}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center rounded-xl bg-zinc-950 py-8">
              <div className="h-24 w-24">
                <Mark />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3">
              <div className="h-9 w-9 shrink-0">
                <Mark />
              </div>
              <div className="min-w-0">
                <p className="font-display truncate text-base font-extrabold text-amber-50">
                  {SEO_CONFIG.brandName}
                </p>
                <p className="truncate text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Прокат {SEO_CONFIG.cityInFormat}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-400">{note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
