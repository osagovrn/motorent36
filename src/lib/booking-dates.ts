import { parseLocalDate } from "@/lib/rental";

/** Пересечение закрытых интервалов [start, end] по календарным датам. */
export function datesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart.getTime() <= bEnd.getTime() && bStart.getTime() <= aEnd.getTime();
}

export function toDayStart(iso: string): Date {
  return parseLocalDate(iso);
}
