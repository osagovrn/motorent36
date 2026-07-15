"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateRental, formatRub } from "@/lib/rental";
import { HELMET_SIZE_OPTIONS } from "@/config/seo";
import { cn } from "@/lib/utils";

type SizeOption = {
  value: string;
  inStock: boolean;
};

type Props = {
  productSlug: string;
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

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7") && d.length > 0) d = "7" + d;
  const p = d.slice(1);
  if (p.length === 0) return "+7";
  if (p.length <= 3) return `+7 (${p}`;
  if (p.length <= 6) return `+7 (${p.slice(0, 3)}) ${p.slice(3)}`;
  if (p.length <= 8)
    return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
  return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 8)}-${p.slice(8, 10)}`;
}

export function BookingPanel({
  productSlug,
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

  const sizes: SizeOption[] = HELMET_SIZE_OPTIONS.map((value) => ({
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [contactMethod, setContactMethod] = useState<
    "Телефон" | "Telegram" | "Мессенджер"
  >("Телефон");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const calc = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return calculateRental(today, today, pricePerDay, marketValue);
    }
    return calculateRental(start, end, pricePerDay, marketValue);
  }, [startDate, endDate, pricePerDay, marketValue, today]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!size) {
      setError("Выберите доступный размер");
      return;
    }
    if (!terms) {
      setError("Примите условия оферты");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          size,
          startDate,
          endDate,
          name: name.trim(),
          phone,
          contactMethod,
          termsAccepted: true,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Не удалось отправить заявку");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Сеть недоступна. Позвоните или напишите в Telegram.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section
        id="bron"
        className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6"
      >
        <h2 className="font-display text-xl text-amber-50 sm:text-2xl">
          Бронирование
        </h2>
        <p className="mt-1 text-sm text-zinc-400">{productTitle}</p>

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
                  "min-w-12 rounded-lg border px-3 py-2 text-sm font-semibold transition",
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
            В наличии сейчас: {availableSizes.join(", ") || "нет"}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-400">Начало аренды</span>
            <input
              type="date"
              min={toInputDate(today)}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none focus:border-amber-500"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-400">Окончание / возврат</span>
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none focus:border-amber-500"
            />
          </label>
        </div>

        <div className="mt-5 space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
          <div className="flex justify-between gap-3 text-zinc-300">
            <span>Стоимость проката</span>
            <span className="font-medium text-amber-50">
              {formatRub(calc.totalRentalPrice)} руб. ({calc.days}{" "}
              {calc.days === 1 ? "сутки" : "суток"})
            </span>
          </div>
          <div className="flex justify-between gap-3 text-zinc-300">
            <span>Обеспечительный платёж (возвратный залог)</span>
            <span className="font-medium text-amber-50">
              {formatRub(calc.refundableDeposit)} руб.
            </span>
          </div>
          <div className="flex justify-between gap-3 border-t border-amber-500/20 pt-2 text-base font-semibold text-amber-100">
            <span>Итого к оплате при получении</span>
            <span>{formatRub(calc.totalDueAtPickup)} руб.</span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Минимальный срок аренды — 1 сутки. При задержке возврата автоматически
          начисляется стоимость следующих суток проката (+{formatRub(pricePerDay)}{" "}
          руб.).
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-400">Имя</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none focus:border-amber-500"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-400">Телефон</span>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              placeholder="+7 (9XX) XXX-XX-XX"
              inputMode="tel"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none focus:border-amber-500"
            />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm text-zinc-400">
              Предпочитаемый способ связи
            </legend>
            <div className="flex flex-wrap gap-2">
              {(["Телефон", "Telegram", "Мессенджер"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setContactMethod(m)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition",
                    contactMethod === m
                      ? "border-amber-500 bg-amber-500/20 text-amber-50"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-500",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-1 size-4 accent-amber-500"
            />
            <span>
              Я принимаю условия{" "}
              <Link href="/offer" className="text-amber-400 underline-offset-2 hover:underline">
                Договора-оферты проката
              </Link>{" "}
              и даю согласие на обработку персональных данных.
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!terms || loading || !size}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {loading ? "Отправка…" : "Забронировать"}
          </button>
        </form>
      </section>

      {success && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="max-w-md rounded-2xl border border-amber-500/30 bg-zinc-900 p-6 text-center shadow-2xl">
            <p className="font-display text-2xl text-amber-50">Спасибо!</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Заявка принята. Менеджер свяжется с вами в течение 15 минут для
              подтверждения бронирования и согласования встречи в Воронеже.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
