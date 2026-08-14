/**
 * Языковая конфигурация сайта.
 * Русский — основной, дефолтный, без префикса в URL (SEO-приоритет).
 * Остальные — префиксные роуты /en/, /fr/, /uz/ ... — отдельные
 * индексируемые страницы для поисковых роботов (не JS-переключение).
 */

export const DEFAULT_LOCALE = "ru" as const;

/** Языки помимо русского. Порядок = порядок в переключателе. */
export const OTHER_LOCALES = [
  "en",
  "fr",
  "zh",
  "uz",
  "hy",
  "az",
  "tg",
  "ky",
] as const;

export type OtherLocale = (typeof OTHER_LOCALES)[number];
export type Locale = typeof DEFAULT_LOCALE | OtherLocale;

export const ALL_LOCALES: Locale[] = [DEFAULT_LOCALE, ...OTHER_LOCALES];

/** Короткая метка в переключателе (RU / EN / FR ...). */
export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  fr: "FR",
  zh: "ZH",
  uz: "UZ",
  hy: "HY",
  az: "AZ",
  tg: "TJ",
  ky: "KY",
};

/** Полное название языка на самом языке — для списка в переключателе. */
export const LOCALE_NAMES: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  fr: "Français",
  zh: "中文",
  uz: "O‘zbekcha",
  hy: "Հայերեն",
  az: "Azərbaycanca",
  tg: "Тоҷикӣ",
  ky: "Кыргызча",
};

/** BCP-47 теги для hreflang / <html lang>. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  ru: "ru",
  en: "en",
  fr: "fr",
  zh: "zh",
  uz: "uz",
  hy: "hy",
  az: "az",
  tg: "tg",
  ky: "ky",
};

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as string[]).includes(value);
}

/**
 * Топонимы (город, район, ориентир, улица) транслитерированы под
 * каждый язык — иначе в заголовках вида "rentals in Воронеж" остаётся
 * кириллица посреди латиницы/другого алфавита.
 */
export const PLACE_NAMES: Record<
  Locale,
  { city: string; cityIn: string; locality: string; landmark: string; street: string }
> = {
  ru: {
    city: "Воронеж",
    cityIn: "в Воронеже",
    locality: "Никольское",
    landmark: "Машметом",
    street: "ул. Ани Максимовой",
  },
  en: {
    city: "Voronezh",
    cityIn: "in Voronezh",
    locality: "Nikolskoye",
    landmark: "Mashmet",
    street: "Ani Maksimovoy St.",
  },
  fr: {
    city: "Voronej",
    cityIn: "à Voronej",
    locality: "Nikolskoïe",
    landmark: "Machmet",
    street: "rue Ani Maksimovoï",
  },
  zh: {
    city: "沃罗涅日",
    cityIn: "沃罗涅日",
    locality: "尼科尔斯科耶",
    landmark: "马什梅特",
    street: "阿尼·马克西莫娃街",
  },
  uz: {
    city: "Voronej",
    cityIn: "Voronejda",
    locality: "Nikolskoye",
    landmark: "Mashmet",
    street: "Ani Maksimovoy ko‘chasi",
  },
  hy: {
    city: "Վորոնեժ",
    cityIn: "Վորոնեժում",
    locality: "Նիկոլսկոյե",
    landmark: "Մաշմետ",
    street: "Անի Մաքսիմովայի փողոց",
  },
  az: {
    city: "Voronej",
    cityIn: "Voronejdə",
    locality: "Nikolskoye",
    landmark: "Maşmet",
    street: "Ani Maksimovoy küçəsi",
  },
  tg: {
    city: "Воронеж",
    cityIn: "Дар Воронеж",
    locality: "Никольское",
    landmark: "Машмет",
    street: "кӯчаи Ани Максимовой",
  },
  ky: {
    city: "Воронеж",
    cityIn: "Воронежде",
    locality: "Никольское",
    landmark: "Машмет",
    street: "Ани Максимовой көчөсү",
  },
};

/**
 * Путь с учётом локали. path начинается с "/" (или "" для корня).
 * ru -> без префикса, остальные -> /{locale}{path}
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean === "" ? "/" : clean;
  return `/${locale}${clean === "" ? "/" : clean}`;
}
