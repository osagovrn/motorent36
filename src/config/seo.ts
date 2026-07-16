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
  /** Личный Telegram — сюда пишут клиенты */
  telegram: "https://t.me/+79507678575",
  telegramLabel: "Telegram",
  maxDisplay: "+7 (919) 183-14-07",
  maxE164: "+79191831407",
  maxUrl: "https://max.ru/+79191831407",
  email: "2020yvwvy2020@gmail.com",
  address: "г. Воронеж (встреча по согласованию)",
  defaultTitle:
    "Аренда мотошлемов в Воронеже — Прокат шлемов от 500 руб/сут",
  defaultDescription:
    "Прокат и аренда мотошлемов в Воронеже от 500 ₽/сутки. Расчёт на сайте, бронь по телефону или в мессенджере. Оплата и залог при встрече.",
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

/** Ссылка «написать в Telegram», опционально с готовым текстом */
export function telegramWriteUrl(prefill?: string): string {
  const base = SEO_CONFIG.telegram;
  if (!prefill?.trim()) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(prefill.trim())}`;
}
