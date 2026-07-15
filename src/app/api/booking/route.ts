import { z } from "zod";
import { NextResponse } from "next/server";
import { calculateRental } from "@/lib/rental";
import { prisma } from "@/lib/prisma";
import { sendBookingTelegram } from "@/lib/telegram";

const bookingSchema = z.object({
  productSlug: z.string().min(1),
  size: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(10, "Укажите телефон"),
  contactMethod: z.enum(["Телефон", "Telegram", "Мессенджер"]),
  termsAccepted: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = bookingSchema.parse(json);

    const product = await prisma.product.findUnique({
      where: { slug: data.productSlug },
      include: { attributes: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
    }

    const sizeAttr = product.attributes.find(
      (a) =>
        a.attributeName === "size" &&
        a.attributeValue === data.size &&
        a.stockQuantity > 0,
    );

    if (!sizeAttr) {
      return NextResponse.json(
        { error: "Выбранный размер недоступен" },
        { status: 400 },
      );
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return NextResponse.json({ error: "Некорректные даты" }, { status: 400 });
    }

    const calc = calculateRental(
      start,
      end,
      product.pricePerDay,
      product.marketValue,
    );

    const telegram = await sendBookingTelegram({
      clientName: data.name,
      phone: data.phone,
      contactMethod: data.contactMethod,
      productTitle: product.title,
      size: data.size,
      startDate: start.toLocaleDateString("ru-RU"),
      endDate: end.toLocaleDateString("ru-RU"),
      days: calc.days,
      totalRentalPrice: calc.totalRentalPrice,
      refundableDeposit: calc.refundableDeposit,
      totalDueAtPickup: calc.totalDueAtPickup,
    });

    if (!telegram.ok) {
      return NextResponse.json(
        { error: "Не удалось отправить уведомление. Попробуйте позже или позвоните." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      telegramSkipped: Boolean(telegram.skipped),
      calculation: calc,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message ?? "Ошибка валидации" },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
