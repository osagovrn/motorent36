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
    title: "Закрытый шлем JIEKAI JK902 (чёрный матовый)",
    description:
      "Модульный JIEKAI JK902 для экзамена в ГИБДД, поездки с пассажиром или короткого выезда. ABS-корпус, поднимаемый визор и солнцезащитные очки. Размеры M и L — примерите на встрече перед оплатой.",
    pricePerDay: 500,
    marketValue: 6000,
    brand: "JIEKAI",
    model: "JK902",
    color: "Чёрный матовый",
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
  return CATALOG.reduce(
    (min, p) => Math.min(min, p.pricePerDay),
    CATALOG[0]?.pricePerDay ?? 500,
  );
}
