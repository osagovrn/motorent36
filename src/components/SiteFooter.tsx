import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-zinc-400 sm:px-6 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-base font-bold text-amber-50">
            {SEO_CONFIG.brandName}
          </p>
          <p className="mt-1">Контакт: {SEO_CONFIG.contactName}</p>
          <p className="mt-1">Посуточная аренда {SEO_CONFIG.cityInFormat}</p>
          <p className="mt-1">
            {LEGAL_CONFIG.statusShort}
            {LEGAL_CONFIG.notVatPayer ? " · без НДС" : ""}
          </p>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Подвал">
          <a
            href={`tel:${SEO_CONFIG.phoneE164}`}
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            {SEO_CONFIG.phoneDisplay}
          </a>
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Telegram
          </a>
          <a
            href={SEO_CONFIG.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            MAX {SEO_CONFIG.maxDisplay}
          </a>
          <Link
            href="/faq/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Частые вопросы
          </Link>
          <Link
            href="/offer/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Договор-оферта проката
          </Link>
          <Link
            href="/privacy/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm hover:text-amber-300"
          >
            Персональные данные
          </Link>
          <a
            href={SEO_CONFIG.osagoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm text-zinc-500 hover:text-amber-300"
          >
            ОСАГО / КАСКО
          </a>
        </nav>
      </div>
    </footer>
  );
}
