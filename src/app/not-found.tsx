import Link from "next/link";
import { SEO_CONFIG } from "@/config/seo";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-start px-4 py-20 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/80">
        404
      </p>
      <h1 className="font-display mt-3 text-3xl font-extrabold text-amber-50 sm:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Ссылка устарела или адреса нет. Можно вернуться на главную или сразу в
        каталог шлемов {SEO_CONFIG.cityInFormat}.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
        >
          На главную
        </Link>
        <Link
          href="/#katalog"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
        >
          Каталог
        </Link>
        <Link
          href="/faq"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}
