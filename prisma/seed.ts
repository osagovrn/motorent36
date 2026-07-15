import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HELMET_IMAGE =
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80";

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
      imageUrls: JSON.stringify([HELMET_IMAGE]),
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
      imageUrls: JSON.stringify([HELMET_IMAGE]),
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
