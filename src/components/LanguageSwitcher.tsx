"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALE_NAMES,
  localePath,
  type Locale,
} from "@/i18n/locales";

type Props = {
  locale: Locale;
  /** Путь без локального префикса, начинается с "/". */
  currentPath: string;
  className?: string;
};

/**
 * Компактный переключатель языка: код текущего языка + стрелка,
 * при открытии — список всех языков (RU первым, выделен как основной).
 * Ссылки — обычные <a>, поэтому доступны роботам и работают без JS.
 */
export function LanguageSwitcher({ locale, currentPath, className }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Выбрать язык / Select language"
        className="focus-ring inline-flex min-h-9 items-center gap-1 rounded-full border border-white/15 px-2.5 text-xs font-semibold text-zinc-300 hover:border-amber-500/40 hover:text-amber-100"
      >
        <span aria-hidden className="text-[13px]">🌐</span>
        {LOCALE_LABELS[locale]}
        <span aria-hidden className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-1.5 max-h-80 w-48 overflow-y-auto rounded-xl border border-white/10 bg-zinc-900 py-1.5 shadow-xl"
        >
          {ALL_LOCALES.map((l) => {
            const active = l === locale;
            const isDefault = l === DEFAULT_LOCALE;
            return (
              <a
                key={l}
                role="menuitem"
                href={localePath(l, currentPath)}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-2 px-3 py-2 text-sm transition ${
                  active
                    ? "bg-amber-500/15 text-amber-100"
                    : "text-zinc-300 hover:bg-white/5 hover:text-amber-100"
                }`}
              >
                <span>
                  {LOCALE_NAMES[l]}
                  {isDefault && (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wide text-amber-500/80">
                      основной
                    </span>
                  )}
                </span>
                <span className="text-[11px] uppercase text-zinc-500">
                  {LOCALE_LABELS[l]}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
