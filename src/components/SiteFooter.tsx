import Link from "next/link";
import { LEGAL_CONFIG, SEO_CONFIG } from "@/config/seo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5rem))] lg:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-400 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-amber-50">
              {SEO_CONFIG.brandName}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              {SEO_CONFIG.contactName} · {SEO_CONFIG.tagline}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              {SEO_CONFIG.street} · {LEGAL_CONFIG.statusShort}
              {LEGAL_CONFIG.notVatPayer ? " · без НДС" : ""}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm"
            aria-label="Подвал"
          >
            <a
              href={`tel:${SEO_CONFIG.phoneE164}`}
              className="focus-ring rounded-sm text-amber-200/90 hover:text-amber-300"
            >
              {SEO_CONFIG.phoneDisplay}
            </a>
            <a
              href={SEO_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-sm hover:text-amber-300"
            >
              Telegram
            </a>
            <a
              href={SEO_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-sm hover:text-amber-300"
            >
              MAX
            </a>
            <Link href="/faq/" className="focus-ring rounded-sm hover:text-amber-300">
              FAQ
            </Link>
            <Link href="/offer/" className="focus-ring rounded-sm hover:text-amber-300">
              Оферта
            </Link>
            <Link href="/privacy/" className="focus-ring rounded-sm hover:text-amber-300">
              ПДн
            </Link>
            {SEO_CONFIG.relatedProjects.map((proj) => (
              <a
                key={proj.href}
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-sm text-zinc-500 hover:text-amber-300"
              >
                {proj.domain}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
