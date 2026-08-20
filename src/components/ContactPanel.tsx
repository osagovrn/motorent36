"use client";

import Link from "next/link";
import { formatRub } from "@/lib/rental";
import { SEO_CONFIG, telegramWriteUrl } from "@/config/seo";

type Props = {
  productTitle: string;
  pricePerDay: number;
  marketValue: number;
  availableSizes: string[];
};

/**
 * Бронирование без формы: только звонок / Telegram / MAX.
 * Даты и размер подтверждает владелец при личном контакте.
 */
export function ContactPanel({
  productTitle,
  pricePerDay,
  marketValue,
  availableSizes,
}: Props) {
  const prefill = [
    `Здравствуйте! Хочу арендовать: ${productTitle}`,
    availableSizes.length > 0
      ? `Размеры в наличии: ${availableSizes.join(", ")}`
      : null,
    `Прокат ${formatRub(pricePerDay)} ₽/сутки, при встрече ${formatRub(marketValue)} ₽ (прокат + залог)`,
  ]
    .filter(Boolean)
    .join(". ");

  const telegramHref = telegramWriteUrl(prefill);

  return (
    <section
      id="bron"
      className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur sm:p-4"
      aria-labelledby="bron-title"
    >
      <h2
        id="bron-title"
        className="font-display text-xl text-amber-50 sm:text-2xl"
      >
        Забронировать
      </h2>
      <p className="mt-1 text-sm text-zinc-400">{productTitle}</p>

      <p className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-3 text-sm leading-snug text-amber-50">
        Формы заявки на сайте нет. Бронь — только по звонку{" "}
        <a href={`tel:${SEO_CONFIG.phoneE164}`} className="font-semibold text-amber-200 underline-offset-2 hover:underline">
          {SEO_CONFIG.phoneDisplay}
        </a>
        , в{" "}
        <a href={SEO_CONFIG.telegram} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-200 underline-offset-2 hover:underline">
          Telegram
        </a>
        {" "}или MAX. Подтвердим размер и даты. Встреча:{" "}
        <strong className="font-bold">{SEO_CONFIG.address}</strong>. При
        получении передаёте{" "}
        <strong className="font-bold">{formatRub(marketValue)} ₽</strong>{" "}
        (прокат + залог).
      </p>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Размеры в наличии:{" "}
        <strong className="font-semibold text-amber-100">
          {availableSizes.join(", ") || "уточните"}
        </strong>
        . Минимальный срок — 1 сутки. Даты и размер подтверждает{" "}
        {SEO_CONFIG.contactName} по телефону или в мессенджере.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
        >
          Позвонить {SEO_CONFIG.phoneDisplay}
        </a>
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-amber-500/55 bg-amber-500/15 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-amber-100 hover:border-amber-400 hover:bg-amber-500/25"
        >
          Написать в Telegram
        </a>
        <a
          href={SEO_CONFIG.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
        >
          MAX {SEO_CONFIG.maxDisplay}
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Условия:{" "}
        <Link
          href="/offer/"
          className="focus-ring rounded-sm text-amber-400 hover:underline"
        >
          оферта
        </Link>
        {" · "}
        <Link
          href="/privacy/"
          className="focus-ring rounded-sm text-amber-400 hover:underline"
        >
          персональные данные
        </Link>
      </p>
    </section>
  );
}
