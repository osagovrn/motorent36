/**
 * Публичные константы сайта.
 * ФИО и ИНН на сайте не публикуются — указываются при заключении договора / в акте передачи.
 */
import { lowestPricePerDay } from "@/data/catalog";

const fromPrice = lowestPricePerDay();

export const SEO_CONFIG = {
  city: "Воронеж",
  cityInFormat: "в Воронеже",
  brandName: "MotoRent36",
  /** Имя для связи (без фамилии на сайте) */
  contactName: "Евгений",
  phoneDisplay: "+7 (950) 767-85-75",
  phoneE164: "+79507678575",
  /** Личный Telegram — сюда пишут клиенты */
  telegram: "https://t.me/+79507678575",
  telegramLabel: "Telegram",
  maxDisplay: "+7 (919) 183-14-07",
  maxE164: "+79191831407",
  maxUrl: "https://max.ru/+79191831407",
  email: "2020yvwvy2020@gmail.com",
  address: "г. Воронеж (встреча по согласованию)",
  defaultTitle: `Аренда мотошлема в Воронеже от ${fromPrice} ₽/сутки — прокат JIEKAI JK902`,
  defaultDescription: `Прокат мотошлема в Воронеже: JIEKAI JK902, размеры M и L, от ${fromPrice} ₽/сутки. Считаете даты на сайте — бронь по телефону, в Telegram или MAX. Оплата и залог при встрече.`,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Сайт ОСАГО / КАСКО (кросс-реклама) */
  osagoUrl: "https://yvwvy.ru/",
  osagoLabel: "ОСАГО и КАСКО онлайн",
  /** Яндекс.Метрика — вставьте ID когда будет счётчик */
  yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "",
} as const;

/** Публичный юридический статус (без ФИО/ИНН на сайте) */
export const LEGAL_CONFIG = {
  statusLabel:
    "плательщик налога на профессиональный доход (самозанятый)",
  statusShort: "Плательщик НПД (самозанятый)",
  notVatPayer: true,
  offerRevision: "17.07.2026",
} as const;

export const HELMET_SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"] as const;

/** Типовая сетка модульных шлемов (см обхвата; уточняйте по примерке). */
export const HELMET_SIZE_CHART = [
  { size: "XS", cm: "53–54" },
  { size: "S", cm: "55–56" },
  { size: "M", cm: "57–58" },
  { size: "L", cm: "59–60" },
  { size: "XL", cm: "61–62" },
  { size: "XXL", cm: "63–64" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Как выбрать размер шлема?",
    answer:
      "Измерьте обхват головы сантиметром над бровями и ушами. Сверьте с таблицей размеров на сайте. При пограничном значении обычно берут меньший размер — подкладка со временем слегка разнашивается. На встрече можно примерить перед оплатой.",
  },
  {
    question: "Где проходит встреча?",
    answer: `Встреча ${SEO_CONFIG.cityInFormat} по согласованию — удобная точка после подтверждения брони. Точный адрес и время согласовываем по телефону, в Telegram или MAX.`,
  },
  {
    question: "Сколько платить при получении и что с залогом?",
    answer:
      "При выдаче всегда передаёте полную рыночную стоимость шлема. Из этой суммы вычитается стоимость проката за выбранные сутки, остаток — возвратный залог. Залог возвращаем сразу при возврате шлема в надлежащем состоянии.",
  },
  {
    question: "Нужны ли документы?",
    answer:
      "Да. Для договора проката при встрече нужны паспорт или водительское удостоверение (фото/копия на месте). ФИО и реквизиты самозанятого указываются в акте при передаче, на сайте не публикуются.",
  },
  {
    question: "Есть ли онлайн-оплата и заявка на сайте?",
    answer:
      "Онлайн-оплаты и формы заявки нет. Бронь — по телефону, в Telegram или MAX. Оплата проката и залога только при личной встрече наличными или переводом по согласованию.",
  },
  {
    question: "Что если задержу возврат?",
    answer:
      "Задержка возврата автоматически начисляет следующие сутки проката по тарифу выбранного шлема. Согласуйте продление заранее — так проще и для вас, и для нас.",
  },
] as const;

/** Verification Яндекс.Вебмастера — meta content из кабинета */
export const yandexVerification =
  process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "";

export function productMeta({
  brand,
  model,
  size,
  price,
  sizes,
}: {
  brand: string;
  model: string;
  size?: string;
  price: number;
  sizes?: string[];
}) {
  const sizePart = size ? ` (размер ${size})` : "";
  const sizesText =
    sizes && sizes.length > 0
      ? `Размеры ${sizes.join(" и ")}.`
      : "";
  return {
    title: `Аренда мотошлема ${brand} ${model}${sizePart} ${SEO_CONFIG.cityInFormat} — от ${price} ₽/сутки`,
    description: `Взять напрокат шлем ${brand} ${model} ${SEO_CONFIG.cityInFormat}: ${price} ₽/сутки, возвратный залог, бронь по телефону, в Telegram или MAX. ${sizesText}`.trim(),
  };
}

/** Ссылка «написать в Telegram», опционально с готовым текстом */
export function telegramWriteUrl(prefill?: string): string {
  const base = SEO_CONFIG.telegram;
  if (!prefill?.trim()) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(prefill.trim())}`;
}

/** Canonical path with trailing slash (static export). */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}
