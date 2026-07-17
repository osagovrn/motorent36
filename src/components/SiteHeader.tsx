"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SEO_CONFIG } from "@/config/seo";
import { BrandMark } from "@/components/BrandMark";

function AnchorNav({
  hash,
  children,
  className,
  onNavigate,
}: {
  hash: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    const path = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", `${path}#${hash}`);
  }

  return (
    <Link href={`/#${hash}`} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;

  function setOpen(next: boolean) {
    setOpenForPath(next ? pathname : null);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenForPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpenForPath(null);

  return (
    <header className="ios-sticky sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 pt-[env(safe-area-inset-top)] backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link
          href="/"
          className="focus-ring flex min-w-0 shrink items-center gap-2.5 rounded-sm"
          onClick={close}
        >
          <BrandMark />
          <span className="min-w-0">
            <span className="font-display block truncate text-base font-extrabold tracking-wide text-amber-50 sm:text-xl">
              {SEO_CONFIG.brandName}
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-[11px] sm:tracking-[0.2em]">
              Прокат {SEO_CONFIG.cityInFormat}
            </span>
          </span>
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-4 text-sm text-zinc-300 md:flex"
          aria-label="Основная навигация"
        >
          <AnchorNav
            hash="kak-eto-rabotaet"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Как это работает
          </AnchorNav>
          <AnchorNav
            hash="katalog"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Каталог
          </AnchorNav>
          <Link
            href="/faq/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            FAQ
          </Link>
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-full border border-amber-500/50 bg-amber-500/15 px-3 font-semibold text-amber-100 hover:border-amber-400 hover:bg-amber-500/25"
            aria-label="Написать в Telegram"
          >
            TG
          </a>
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="focus-ring inline-flex min-h-11 items-center rounded-full border border-amber-500/40 bg-amber-500 px-3 font-semibold text-zinc-950 hover:bg-amber-400"
            aria-label={`Позвонить ${SEO_CONFIG.phoneDisplay}`}
          >
            {SEO_CONFIG.phoneDisplay}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-full border border-amber-500/50 bg-amber-500/15 px-3 text-sm font-semibold text-amber-100"
            aria-label="Написать в Telegram"
          >
            TG
          </a>
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="focus-ring inline-flex min-h-11 items-center rounded-full bg-amber-500 px-3 text-sm font-semibold text-zinc-950"
            aria-label={`Позвонить ${SEO_CONFIG.phoneDisplay}`}
          >
            Звонок
          </a>
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 text-zinc-100"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id={menuId}
          className="border-t border-white/10 bg-zinc-950 px-4 py-3 md:hidden"
        >
          <nav className="flex flex-col gap-1 text-sm" aria-label="Мобильное меню">
            <AnchorNav
              hash="kak-eto-rabotaet"
              onNavigate={close}
              className="focus-ring rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5"
            >
              Как это работает
            </AnchorNav>
            <AnchorNav
              hash="katalog"
              onNavigate={close}
              className="focus-ring rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5"
            >
              Каталог
            </AnchorNav>
            <Link
              href="/faq/"
              onClick={close}
              className="focus-ring rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5"
            >
              FAQ
            </Link>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-3 font-semibold text-amber-100 hover:bg-amber-500/20"
            >
              Telegram
            </a>
            <a
              href={SEO_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5"
            >
              MAX
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
