"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

function AnchorNav({
  hash,
  children,
  className,
}: {
  hash: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `/#${hash}`);
    }
  }

  return (
    <Link href={`/#${hash}`} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="ios-sticky sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 pt-[env(safe-area-inset-top)] backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link href="/" className="min-w-0 shrink">
          <span className="font-display block truncate text-base font-extrabold tracking-wide text-amber-50 sm:text-xl">
            {SEO_CONFIG.brandName}
          </span>
          <span className="block truncate text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-[11px] sm:tracking-[0.2em]">
            Прокат {SEO_CONFIG.cityInFormat}
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1.5 text-sm text-zinc-300 sm:gap-4">
          <AnchorNav
            hash="kak-eto-rabotaet"
            className="hidden min-h-11 items-center hover:text-amber-300 md:inline-flex"
          >
            Как это работает
          </AnchorNav>
          <AnchorNav
            hash="katalog"
            className="inline-flex min-h-11 items-center px-1 hover:text-amber-300"
          >
            Каталог
          </AnchorNav>
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="inline-flex min-h-11 items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 text-amber-200 hover:bg-amber-500/20"
            aria-label={`Позвонить ${SEO_CONFIG.phoneDisplay}`}
          >
            <span className="sm:hidden">Звонок</span>
            <span className="hidden sm:inline">{SEO_CONFIG.phoneDisplay}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-zinc-400 sm:px-6 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-base font-bold text-amber-50">
            {SEO_CONFIG.brandName}
          </p>
          <p className="mt-1">Посуточная аренда {SEO_CONFIG.cityInFormat}</p>
          <p className="mt-1">
            Плательщик НПД (самозанятый)
            {LEGAL_CONFIG.notVatPayer ? " · без НДС" : ""}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="inline-flex min-h-11 items-center hover:text-amber-300"
          >
            {SEO_CONFIG.phoneDisplay}
          </a>
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center hover:text-amber-300"
          >
            Telegram
          </a>
          <Link
            href="/offer"
            className="inline-flex min-h-11 items-center hover:text-amber-300"
          >
            Договор-оферта проката
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center hover:text-amber-300"
          >
            Персональные данные
          </Link>
        </div>
      </div>
    </footer>
  );
}
