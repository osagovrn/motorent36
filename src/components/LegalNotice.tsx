import { SEO_CONFIG } from "@/config/seo";
import type { Dict } from "@/i18n/types";

/**
 * Баннер над юридическим текстом на не-русских страницах: поясняет,
 * что юридическую силу имеет русский оригинал документа (см. ниже).
 * Сам текст оферты/политики не переводится дословно — риск юридической
 * неточности при переводе договора выше пользы, плюс закон РФ
 * рассматривает как обязывающий именно русский текст.
 */
export function LegalNotice({ dict }: { dict: Dict }) {
  if (!dict.legal.noticeTitle) return null;
  return (
    <div className="mb-8 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3.5 text-sm leading-relaxed text-amber-50">
      <p className="font-semibold">{dict.legal.noticeTitle}</p>
      <p className="mt-1 text-amber-100/90">
        {dict.legal.noticeBody(SEO_CONFIG.contactName, SEO_CONFIG.phoneDisplay)}
      </p>
    </div>
  );
}
