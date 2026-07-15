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
 * Округление в большую сторону. Минимум 1 сутки.
 * Итого при получении всегда = marketValue (полная стоимость товара).
 */
export function calculateRental(
  startDate: Date,
  endDate: Date,
  pricePerDay = 500,
  marketValue = 6000,
): RentalCalculation {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const diffTime = Math.abs(end - start);
  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (days < 1) days = 1;

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
