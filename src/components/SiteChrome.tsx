import Link from "next/link";
import { SEO_CONFIG } from "@/config/seo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-lg tracking-wide text-amber-50 sm:text-xl">
            {SEO_CONFIG.brandName}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Прокат {SEO_CONFIG.cityInFormat}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/#kak-eto-rabotaet" className="hidden hover:text-amber-300 sm:inline">
            Как это работает
          </Link>
          <Link href="/#katalog" className="hover:text-amber-300">
            Каталог
          </Link>
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-amber-200 hover:bg-amber-500/20"
          >
            {SEO_CONFIG.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-400 sm:px-6 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-base text-amber-50">
            {SEO_CONFIG.brandName}
          </p>
          <p className="mt-1">Посуточная аренда {SEO_CONFIG.cityInFormat}</p>
          <p className="mt-1">Самозанятый · без онлайн-оплаты</p>
        </div>
        <div className="flex flex-col gap-2">
          <a href={`tel:${SEO_CONFIG.phoneE164}`} className="hover:text-amber-300">
            {SEO_CONFIG.phoneDisplay}
          </a>
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300"
          >
            Telegram
          </a>
          <Link href="/offer" className="hover:text-amber-300">
            Договор-оферта проката
          </Link>
        </div>
      </div>
    </footer>
  );
}
