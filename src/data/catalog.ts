/** Статический каталог — без БД, для GitHub Pages / static export */

export type CatalogProduct = {
  slug: string;
  title: string;
  description: string;
  pricePerDay: number;
  marketValue: number;
  brand: string;
  model: string;
  color: string;
  categoryName: string;
  images: string[];
  /** Размеры в наличии */
  sizes: string[];
};

export const CATALOG: CatalogProduct[] = [
  {
    slug: "jiekai-jk902-black-matt",
    title: "Закрытый шлем JIEKAI JK902 (черный матовый)",
    description:
      "Мотошлем JIEKAI JK902 модулярного типа позволяет носить его различными способами, компонуя поднятие забрала, визора и солнцезащитных очков. Корпус из ударопрочного ABS-пластика. Отличный выбор для поездок по Воронежу.",
    pricePerDay: 500,
    marketValue: 6000,
    brand: "JIEKAI",
    model: "JK902",
    color: "Черный матовый",
    categoryName: "Мотошлемы",
    images: ["/products/jk902-1.jpg", "/products/jk902-2.jpg"],
    sizes: ["M", "L"],
  },
];

export function getAllProducts(): CatalogProduct[] {
  return CATALOG;
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function lowestPricePerDay(): number {
  return CATALOG.reduce((min, p) => Math.min(min, p.pricePerDay), CATALOG[0]?.pricePerDay ?? 500);
}
