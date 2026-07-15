export const SEO_CONFIG = {
  city: "Воронеж",
  cityInFormat: "в Воронеже",
  brandName: "MotoRent36",
  phoneDisplay: "+7 (950) 767-85-75",
  phoneE164: "+79507678575",
  telegram: "https://t.me/+79507678575",
  email: "2020yvwvy2020@gmail.com",
  address: "г. Воронеж",
  defaultTitle:
    "Аренда мотошлемов в Воронеже — Прокат шлемов от 500 руб/сут",
  defaultDescription:
    "Выгодный прокат и аренда мотошлемов разных размеров в Воронеже. Оформление по договору для самозанятых. Полный возврат залога при сдаче шлема. Забронируйте онлайн!",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
