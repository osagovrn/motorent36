"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localePath, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/**
 * Глобальный 404 рендерится напрямую под корневым layout (минуя
 * вложенные (ru)/[locale] layout'ы), поэтому шапку/подвал и язык
 * определяем здесь же по первому сегменту пути.
 */
function detectLocale(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return seg && isLocale(seg) ? seg : DEFAULT_LOCALE;
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const dict = getDictionary(locale);
  const home = localePath(locale, "/");

  return (
    <>
      <SiteHeader locale={locale} dict={dict.nav} />
      <main id="main-content" className="flex-1 w-full min-w-0">
        <div className="mx-auto flex w-full max-w-lg flex-col items-start px-4 py-20 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/80">
            404
          </p>
          <h1 className="font-display mt-3 text-3xl font-extrabold text-amber-50 sm:text-4xl">
            {dict.notFound.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {dict.notFound.text}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Link
              href={home}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
            >
              {dict.notFound.backHome}
            </Link>
            <Link
              href={localePath(locale, "/faq/")}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
            >
              FAQ
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
