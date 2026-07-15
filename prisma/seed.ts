import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HELMET_IMAGES = [
  "/products/jk902-1.jpg",
  "/products/jk902-2.jpg",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "helmets" },
    update: { name: "Мотошлемы" },
    create: { slug: "helmets", name: "Мотошлемы" },
  });

  const product = await prisma.product.upsert({
    where: { slug: "jiekai-jk902-black-matt" },
    update: {
      title: "Закрытый шлем JIEKAI JK902 (черный матовый)",
      description:
        "Мотошлем JIEKAI JK902 модулярного типа позволяет носить его различными способами, компонуя поднятие забрала, визора и солнцезащитных очков. Корпус из ударопрочного ABS-пластика. Отличный выбор для поездок по Воронежу.",
      pricePerDay: 500,
      marketValue: 6000,
      brand: "JIEKAI",
      model: "JK902",
      color: "Черный матовый",
      imageUrls: JSON.stringify(HELMET_IMAGES),
      categoryId: category.id,
    },
    create: {
      categoryId: category.id,
      title: "Закрытый шлем JIEKAI JK902 (черный матовый)",
      slug: "jiekai-jk902-black-matt",
      description:
        "Мотошлем JIEKAI JK902 модулярного типа позволяет носить его различными способами, компонуя поднятие забрала, визора и солнцезащитных очков. Корпус из ударопрочного ABS-пластика. Отличный выбор для поездок по Воронежу.",
      pricePerDay: 500,
      marketValue: 6000,
      brand: "JIEKAI",
      model: "JK902",
      color: "Черный матовый",
      imageUrls: JSON.stringify(HELMET_IMAGES),
    },
  });

  await prisma.productAttribute.deleteMany({ where: { productId: product.id } });

  await prisma.productAttribute.createMany({
    data: [
      {
        productId: product.id,
        attributeName: "size",
        attributeValue: "M",
        stockQuantity: 1,
      },
      {
        productId: product.id,
        attributeName: "size",
        attributeValue: "L",
        stockQuantity: 1,
      },
    ],
  });

  console.log("Seed OK:", product.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
