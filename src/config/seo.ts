/**
 * Публичные константы сайта.
 * ФИО и ИНН на сайте не публикуются — указываются при заключении договора / в акте передачи.
 */
export const SEO_CONFIG = {
  city: "Воронеж",
  cityInFormat: "в Воронеже",
  brandName: "MotoRent36",
  /** Имя для связи (без фамилии на сайте) */
  contactName: "Евгений",
  phoneDisplay: "+7 (950) 767-85-75",
  phoneE164: "+79507678575",
  telegram: "https://t.me/+79507678575",
  maxDisplay: "+7 (919) 183-14-07",
  maxE164: "+79191831407",
  maxUrl: "https://max.ru/+79191831407",
  email: "2020yvwvy2020@gmail.com",
  address: "г. Воронеж (встреча по согласованию)",
  defaultTitle:
    "Аренда мотошлемов в Воронеже — Прокат шлемов от 500 руб/сут",
  defaultDescription:
    "Прокат и аренда мотошлемов в Воронеже от 500 ₽/сутки. Бронирование онлайн, оплата и залог при встрече. Договор проката, возвратный залог.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Яндекс.Метрика — вставьте ID когда будет счётчик */
  yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "",
} as const;

/** Публичный юридический статус (без ФИО/ИНН на сайте) */
export const LEGAL_CONFIG = {
  statusLabel:
    "плательщик налога на профессиональный доход (самозанятый)",
  statusShort: "Плательщик НПД (самозанятый)",
  notVatPayer: true,
  offerRevision: "15.07.2026",
} as const;

export const HELMET_SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function productMeta({
  brand,
  model,
  size,
  price,
}: {
  brand: string;
  model: string;
  size?: string;
  price: number;
}) {
  const sizePart = size ? ` (размер ${size})` : "";
  return {
    title: `Аренда мотошлема ${brand} ${model}${sizePart} в Воронеже — прокат экипировки`,
    description: `Ищете, где взять напрокат шлем ${brand} в Воронеже? Стоимость аренды всего ${price} руб/сутки. Полный возвратный залог. Посуточный прокат мотоэкипировки.`,
  };
}
