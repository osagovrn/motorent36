"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateRental,
  formatDaysLabel,
  formatRub,
  parseLocalDate,
} from "@/lib/rental";
import { HELMET_SIZE_OPTIONS, SEO_CONFIG, telegramWriteUrl } from "@/config/seo";
import { HelmetSizeChart } from "@/components/HelmetSizeChart";
import { cn } from "@/lib/utils";

type Props = {
  productTitle: string;
  pricePerDay: number;
  marketValue: number;
  availableSizes: string[];
};

type DateRange = { today: string; start: string; end: string };

function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfToday(): Date {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function readClientRange(): DateRange {
  const today = startOfToday();
  const start = toInputDate(today);
  return { today: start, start, end: toInputDate(addDays(today, 1)) };
}

/**
 * Калькулятор + связь по телефону / Telegram / MAX.
 * Даты ставятся после mount — иначе static export «запекает» день сборки.
 */
export function ContactPanel({
  productTitle,
  pricePerDay,
  marketValue,
  availableSizes,
}: Props) {
  const [todayIso, setTodayIso] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const datesReady = Boolean(todayIso && start && end);

  useEffect(() => {
    const range = readClientRange();
    /* Клиентский календарный день (не SSR/build date). */
    /* eslint-disable react-hooks/set-state-in-effect -- intentional client-only init */
    setTodayIso(range.today);
    setStart(range.start);
    setEnd(range.end);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const sizes = HELMET_SIZE_OPTIONS.map((value) => ({
    value,
    inStock: availableSizes.includes(value),
  }));

  const defaultSize = sizes.find((s) => s.inStock)?.value ?? "";
  const [size, setSize] = useState(defaultSize);

  const calc = useMemo(() => {
    if (!datesReady) {
      return {
        days: 1,
        totalRentalPrice: pricePerDay,
        refundableDeposit: Math.max(0, marketValue - pricePerDay),
        totalDueAtPickup: marketValue,
      };
    }
    const s = parseLocalDate(start);
    const e = parseLocalDate(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
      return calculateRental(
        startOfToday(),
        startOfToday(),
        pricePerDay,
        marketValue,
      );
    }
    return calculateRental(s, e, pricePerDay, marketValue);
  }, [datesReady, start, end, pricePerDay, marketValue]);

  function onStartChange(value: string) {
    if (!todayIso) return;
    const next = value < todayIso ? todayIso : value;
    setStart(next);
    if (end < next) setEnd(next);
  }

  function onEndChange(value: string) {
    setEnd(value < start ? start : value);
  }

  function applyPreset(kind: "1day" | "weekend" | "3days") {
    const today = startOfToday();
    const todayStr = toInputDate(today);

    if (kind === "1day") {
      setStart(todayStr);
      setEnd(toInputDate(addDays(today, 1)));
      return;
    }
    if (kind === "3days") {
      setStart(todayStr);
      setEnd(toInputDate(addDays(today, 3)));
      return;
    }

    const day = today.getDay();
    if (day === 0) {
      setStart(todayStr);
      setEnd(todayStr);
      return;
    }
    if (day === 6) {
      setStart(todayStr);
      setEnd(toInputDate(addDays(today, 1)));
      return;
    }
    const sat = addDays(today, 6 - day);
    setStart(toInputDate(sat));
    setEnd(toInputDate(addDays(sat, 1)));
  }

  const prefill = [
    `Здравствуйте! Хочу арендовать: ${productTitle}`,
    size ? `Размер: ${size}` : null,
    datesReady ? `Даты: ${start} — ${end}` : null,
    `По калькулятору: прокат ${calc.totalRentalPrice} ₽, залог ${calc.refundableDeposit} ₽, итого при встрече ${calc.totalDueAtPickup} ₽`,
  ]
    .filter(Boolean)
    .join(". ");

  const telegramHref = telegramWriteUrl(prefill);

  return (
    <section
      id="bron"
      className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur sm:p-6"
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
        Онлайн-заявок пока нет. Позвоните или напишите — подтвердим размер и
        даты. При получении передаёте{" "}
        <strong className="font-bold">{formatRub(marketValue)} ₽</strong>{" "}
        (прокат + залог).
      </p>

      <div className="mt-5">
        <p
          id="size-label"
          className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500"
        >
          Размер
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="size-label"
        >
          {sizes.map((s) => (
            <button
              key={s.value}
              type="button"
              disabled={!s.inStock}
              aria-pressed={s.inStock ? size === s.value : undefined}
              onClick={() => setSize(s.value)}
              className={cn(
                "focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition",
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

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Быстрый срок
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["1day", "1 сутки"],
              ["weekend", "Выходные"],
              ["3days", "3 суток"],
            ] as const
          ).map(([kind, label]) => (
            <button
              key={kind}
              type="button"
              disabled={!datesReady}
              onClick={() => applyPreset(kind)}
              className="focus-ring inline-flex min-h-10 items-center rounded-lg border border-white/10 bg-zinc-950/60 px-3 text-xs font-semibold text-zinc-300 hover:border-amber-500/40 hover:text-amber-100 disabled:opacity-40"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-400">Начало аренды</span>
          <input
            type="date"
            min={todayIso || undefined}
            value={start}
            disabled={!datesReady}
            onChange={(e) => onStartChange(e.target.value)}
            className="focus-ring w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500 disabled:opacity-50"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-zinc-400">Окончание / возврат</span>
          <input
            type="date"
            min={start || undefined}
            value={end}
            disabled={!datesReady}
            onChange={(e) => onEndChange(e.target.value)}
            className="focus-ring w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500 disabled:opacity-50"
          />
        </label>
      </div>

      <div
        className="mt-5 space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm"
        aria-live="polite"
      >
        <div className="flex flex-col gap-1 text-zinc-300 sm:flex-row sm:justify-between sm:gap-3">
          <span>Стоимость проката</span>
          <span className="shrink-0 font-medium text-amber-50">
            {formatRub(calc.totalRentalPrice)} ₽ ({formatDaysLabel(calc.days)})
          </span>
        </div>
        <div className="flex flex-col gap-1 text-zinc-300 sm:flex-row sm:justify-between sm:gap-3">
          <span>Возвратный залог</span>
          <span className="shrink-0 font-medium text-amber-50">
            {formatRub(calc.refundableDeposit)} ₽
          </span>
        </div>
        <div className="flex flex-col gap-1 border-t border-amber-500/20 pt-2 text-base font-semibold text-amber-100 sm:flex-row sm:justify-between sm:gap-3">
          <span>Итого при получении</span>
          <span className="shrink-0">
            {formatRub(calc.totalDueAtPickup)} ₽
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        Минимальный срок — 1 сутки. Калькулятор ориентировочный; бронь
        подтверждает {SEO_CONFIG.contactName} по телефону или в мессенджере.
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
          className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-zinc-100 hover:border-amber-500/50 hover:bg-amber-500/10"
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
