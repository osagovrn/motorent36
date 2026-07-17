export type RentalCalculation = {
  days: number;
  totalRentalPrice: number;
  refundableDeposit: number;
  totalDueAtPickup: number;
};

/** Парсинг YYYY-MM-DD в локальную дату (Safari не ломает timezone на UTC). */
export function parseLocalDate(iso: string): Date {
  const parts = iso.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  if (!y || !m || !d) return new Date(NaN);
  return new Date(y, m - 1, d);
}

/**
 * Число календарных суток проката.
 * Один и тот же день = 1 сутки; иначе ceil по разнице дат.
 * Если конец раньше начала — считаем от более ранней к более поздней.
 */
export function rentalDays(startDate: Date, endDate: Date): number {
  const start = startDate.getTime();
  const end = endDate.getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return 1;
  const diffTime = Math.abs(end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

/**
 * Округление в большую сторону. Минимум 1 сутки.
 * Итого при получении всегда = marketValue (полная стоимость товара).
 */
export function calculateRental(
  startDate: Date,
  endDate: Date,
  pricePerDay = 500,
  marketValue = 6000,
): RentalCalculation {
  const days = rentalDays(startDate, endDate);
  const totalRentalPrice = days * pricePerDay;
  const refundableDeposit = Math.max(0, marketValue - totalRentalPrice);

  return {
    days,
    totalRentalPrice,
    refundableDeposit,
    totalDueAtPickup: marketValue,
  };
}

export function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

/** 1 сутки · 2 суток · 5 суток */
export function formatDaysLabel(days: number): string {
  const n = Math.abs(days) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${days} суток`;
  if (n1 === 1) return `${days} сутки`;
  if (n1 >= 2 && n1 <= 4) return `${days} суток`;
  return `${days} суток`;
}
