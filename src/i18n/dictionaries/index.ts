import type { Locale } from "@/i18n/locales";
import type { Dict } from "@/i18n/types";
import { ru } from "@/i18n/dictionaries/ru";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { zh } from "@/i18n/dictionaries/zh";
import { uz } from "@/i18n/dictionaries/uz";
import { hy } from "@/i18n/dictionaries/hy";
import { az } from "@/i18n/dictionaries/az";
import { tg } from "@/i18n/dictionaries/tg";
import { ky } from "@/i18n/dictionaries/ky";

const DICTS: Record<Locale, Dict> = { ru, en, fr, zh, uz, hy, az, tg, ky };

export function getDictionary(locale: Locale): Dict {
  return DICTS[locale];
}
