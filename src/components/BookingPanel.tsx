"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateRental, formatRub, parseLocalDate } from "@/lib/rental";
import { HELMET_SIZE_OPTIONS, SEO_CONFIG } from "@/config/seo";
import { HelmetSizeChart } from "@/components/HelmetSizeChart";
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
    "Телефон" | "Telegram" | "MAX"
  >("Телефон");
  const [terms, setTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    if (endDate < value) {
      setEndDate(value);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!size) {
      setError("Выберите доступный размер");
      return;
    }
    if (phone.replace(/\D/g, "").length < 11) {
      setError("Укажите телефон полностью, например +7 (950) 767-85-75");
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
          website: honeypot,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Не удалось отправить заявку");
        return;
      }
      setSuccess(true);
      if (typeof window !== "undefined" && SEO_CONFIG.yandexMetrikaId) {
        const ym = (
          window as unknown as {
            ym?: (id: string, method: string, goal: string) => void;
          }
        ).ym;
        ym?.(SEO_CONFIG.yandexMetrikaId, "reachGoal", "booking_ok");
      }
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

        <p className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-3 text-sm leading-snug text-amber-50">
          При получении передаёте{" "}
          <strong className="font-bold">{formatRub(marketValue)} ₽</strong>{" "}
          (прокат + возвратный залог). Онлайн-оплаты нет — расчёт при встрече.
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
            В наличии сейчас: {availableSizes.join(", ") || "нет"}
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
            <span>Обеспечительный платёж (возвратный залог)</span>
            <span className="shrink-0 font-medium text-amber-50">
              {formatRub(calc.refundableDeposit)} руб.
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-amber-500/20 pt-2 text-base font-semibold text-amber-100 sm:flex-row sm:justify-between sm:gap-3">
            <span>Итого к оплате при получении</span>
            <span className="shrink-0">
              {formatRub(calc.totalDueAtPickup)} руб.
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Минимальный срок аренды — 1 сутки. При задержке возврата автоматически
          начисляется стоимость следующих суток проката (+{formatRub(pricePerDay)}{" "}
          руб.).
        </p>

        <form onSubmit={onSubmit} className="relative mt-6 space-y-3">
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            aria-hidden
          >
            <label>
              Сайт
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-400">Имя</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              autoComplete="name"
              className="w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500"
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
              autoComplete="tel"
              className="w-full min-h-11 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 outline-none focus:border-amber-500"
            />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm text-zinc-400">
              Предпочитаемый способ связи
            </legend>
            <div className="flex flex-wrap gap-2">
              {(["Телефон", "Telegram", "MAX"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setContactMethod(m)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-lg border px-3 py-2 text-sm transition",
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
              и{" "}
              <Link href="/privacy" className="text-amber-400 underline-offset-2 hover:underline">
                Политики обработки персональных данных
              </Link>
              .
            </span>
          </label>

          {error && (
            <div className="space-y-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-200">
              <p>{error}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a
                  href={`tel:${SEO_CONFIG.phoneE164}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-500 px-3 text-center text-xs font-bold uppercase tracking-wide text-zinc-950 hover:bg-amber-400"
                >
                  Позвонить
                </a>
                <a
                  href={SEO_CONFIG.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-500/40 px-3 text-center text-xs font-semibold text-amber-100 hover:bg-amber-500/10"
                >
                  Telegram
                </a>
                <a
                  href={SEO_CONFIG.maxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-500/40 px-3 text-center text-xs font-semibold text-amber-100 hover:bg-amber-500/10"
                >
                  MAX
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!terms || loading || !size || phone.replace(/\D/g, "").length < 11}
            className="w-full min-h-12 rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {loading ? "Отправка…" : "Забронировать"}
          </button>
        </form>
      </section>

      {success && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:items-center"
        >
          <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-zinc-900 p-6 text-center shadow-2xl">
            <p className="font-display text-2xl font-bold text-amber-50">Спасибо!</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Заявка принята. {SEO_CONFIG.contactName} свяжется с вами в течение
              15 минут для подтверждения бронирования и согласования встречи в
              Воронеже.
            </p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 sm:w-auto"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
