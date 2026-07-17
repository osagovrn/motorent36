import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

const linkClass =
  "focus-ring block rounded-sm py-0.5 hover:text-amber-300";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm leading-snug text-zinc-400 sm:grid-cols-2 sm:items-start sm:gap-6 sm:px-6 sm:py-6">
        <div className="space-y-1">
          <p className="font-display text-base font-bold text-amber-50">
            {SEO_CONFIG.brandName}
          </p>
          <p>Контакт: {SEO_CONFIG.contactName}</p>
          <p className="text-amber-200/90">{SEO_CONFIG.locationLabel}</p>
          <p className="text-zinc-500">{SEO_CONFIG.street}</p>
          <p>Посуточная аренда {SEO_CONFIG.cityInFormat}</p>
          <p>
            {LEGAL_CONFIG.statusShort}
            {LEGAL_CONFIG.notVatPayer ? " · без НДС" : ""}
          </p>
        </div>

        <nav
          className="space-y-1 sm:text-right"
          aria-label="Подвал"
        >
          <a href={`tel:${SEO_CONFIG.phoneE164}`} className={linkClass}>
            {SEO_CONFIG.phoneDisplay}
          </a>
          <a
            href={SEO_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Telegram
          </a>
          <a
            href={SEO_CONFIG.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            MAX {SEO_CONFIG.maxDisplay}
          </a>
          <Link href="/faq/" className={linkClass}>
            Частые вопросы
          </Link>
          <Link href="/offer/" className={linkClass}>
            Договор-оферта проката
          </Link>
          <Link href="/privacy/" className={linkClass}>
            Персональные данные
          </Link>
          <a
            href={SEO_CONFIG.osagoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-zinc-500 hover:text-amber-300`}
          >
            ОСАГО / КАСКО
          </a>
        </nav>
      </div>
    </footer>
  );
}
