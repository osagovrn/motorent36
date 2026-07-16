"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateRental, formatRub, parseLocalDate } from "@/lib/rental";
import { HELMET_SIZE_OPTIONS, SEO_CONFIG, telegramWriteUrl } from "@/config/seo";
import { HelmetSizeChart } from "@/components/HelmetSizeChart";
import { cn } from "@/lib/utils";

type Props = {
  productTitle: string;
  pricePerDay: number;
  marketValue: number;
  availableSizes: string[];
};

function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Калькулятор + связь по телефону / Telegram / MAX.
 * Онлайн-заявка отключена (статический сайт / GitHub Pages).
 */
export function ContactPanel({
  productTitle,
  pricePerDay,
  marketValue,
  availableSizes,
}: Props) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const sizes = HELMET_SIZE_OPTIONS.map((value) => ({
    value,
    inStock: availableSizes.includes(value),
  }));

  const defaultSize = sizes.find((s) => s.inStock)?.value ?? "";
  const [size, setSize] = useState(defaultSize);
  const [startDate, setStartDate] = useState(toInputDate(today));
  const [endDate, setEndDate] = useState(() => {
    const e = new Date(today);
    e.setDate(e.getDate() + 1);
    return toInputDate(e);
  });

  const calc = useMemo(() => {
    const start = parseLocalDate(startDate);
    const end = parseLocalDate(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return calculateRental(today, today, pricePerDay, marketValue);
    }
    return calculateRental(start, end, pricePerDay, marketValue);
  }, [startDate, endDate, pricePerDay, marketValue, today]);

  function onStartChange(value: string) {
    setStartDate(value);
    if (endDate < value) setEndDate(value);
  }

  const prefill = [
    `Здравствуйте! Хочу арендовать: ${productTitle}`,
    size ? `Размер: ${size}` : null,
    `Даты: ${startDate} — ${endDate}`,
    `По калькулятору: прокат ${calc.totalRentalPrice} ₽, залог ${calc.refundableDeposit} ₽, итого при встрече ${calc.totalDueAtPickup} ₽`,
  ]
    .filter(Boolean)
    .join(". ");

  const telegramHref = telegramWriteUrl(prefill);

  return (
    <section
      id="bron"
      className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6"
    >
      <h2 className="font-display text-xl text-amber-50 sm:text-2xl">
        Забронировать
      </h2>
      <p className="mt-1 text-sm text-zinc-400">{productTitle}</p>

      <p className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-3 text-sm leading-snug text-amber-50">
        Онлайн-заявок пока нет. Позвоните или напишите — подтвердим размер и
        даты. При получении передаёте{" "}
        <strong className="font-bold">{formatRub(marketValue)} ₽</strong>{" "}
        (прокат + залог).
      </p>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Размер
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s.value}
              type="button"
              disabled={!s.inStock}
              onClick={() => setSize(s.value)}
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition",
                !s.inStock &&
                  "cursor-not-allowed border-zinc-800 bg-zinc-950/50 text-zinc-600 line-through",
                s.inStock &&
                  size !== s.value &&
                  "border-zinc-600 bg-zinc-800 text-zinc-200 hover:border-amber-500/50",
                s.inStock &&
                  size === s.value &&
                  "border-amber-500 bg-amber-500/20 text-amber-100",
              )}
            >
              {s.value}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          В наличии: {availableSizes.join(", ") || "нет"}
        </p>
        <HelmetSizeChart
          inStock={availableSizes}
          compact
          className="mt-3 rounded-xl border border-white/5 bg-zinc-950/50 p-3"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-400">Начало аренды</span>
          <input
            type="date"
            min={toInputDate(today)}
            value={startDate}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-400">Окончание / возврат</span>
          <input
            type="date"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500"
          />
        </label>
      </div>

      <div className="mt-5 space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
        <div className="flex flex-col gap-1 text-zinc-300 sm:flex-row sm:justify-between sm:gap-3">
          <span>Стоимость проката</span>
          <span className="shrink-0 font-medium text-amber-50">
            {formatRub(calc.totalRentalPrice)} руб. ({calc.days}{" "}
            {calc.days === 1 ? "сутки" : "суток"})
          </span>
        </div>
        <div className="flex flex-col gap-1 text-zinc-300 sm:flex-row sm:justify-between sm:gap-3">
          <span>Возвратный залог</span>
          <span className="shrink-0 font-medium text-amber-50">
            {formatRub(calc.refundableDeposit)} руб.
          </span>
        </div>
        <div className="flex flex-col gap-1 border-t border-amber-500/20 pt-2 text-base font-semibold text-amber-100 sm:flex-row sm:justify-between sm:gap-3">
          <span>Итого при получении</span>
          <span className="shrink-0">
            {formatRub(calc.totalDueAtPickup)} руб.
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        Минимальный срок — 1 сутки. Калькулятор ориентировочный; бронь
        подтверждает {SEO_CONFIG.contactName} по телефону или в мессенджере.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-sky-400"
        >
          Написать в Telegram
        </a>
        <a
          href={`tel:${SEO_CONFIG.phoneE164}`}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
        >
          Позвонить {SEO_CONFIG.phoneDisplay}
        </a>
        <a
          href={SEO_CONFIG.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-zinc-100 hover:border-amber-500/50"
        >
          MAX {SEO_CONFIG.maxDisplay}
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Условия:{" "}
        <Link href="/offer" className="text-amber-400 hover:underline">
          оферта
        </Link>
        {" · "}
        <Link href="/privacy" className="text-amber-400 hover:underline">
          персональные данные
        </Link>
      </p>
    </section>
  );
}
