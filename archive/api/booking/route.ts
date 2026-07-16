import { z } from "zod";
import { NextResponse } from "next/server";
import { datesOverlap } from "@/lib/booking-dates";
import { calculateRental, parseLocalDate } from "@/lib/rental";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { sendBookingTelegram } from "@/lib/telegram";

const bookingSchema = z.object({
  productSlug: z.string().min(1),
  size: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  name: z.string().min(2, "Укажите имя").max(80),
  phone: z
    .string()
    .refine(
      (v) => v.replace(/\D/g, "").length >= 11,
      "Укажите телефон полностью, например +7 (950) 767-85-75",
    ),
  contactMethod: z.enum(["Телефон", "Telegram", "MAX"]),
  termsAccepted: z.literal(true),
  /** Антибот-поле: если заполнено — молча игнорируем */
  website: z.string().max(200).optional(),
});

function allowTelegramSkip(): boolean {
  if (process.env.ALLOW_TELEGRAM_SKIP === "1") return true;
  return process.env.NODE_ENV !== "production";
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const ipLimit = rateLimit(`ip:${ip}`, 8, 15 * 60 * 1000);
    if (!ipLimit.ok) {
      return NextResponse.json(
        {
          error: `Слишком много заявок. Подождите ~${ipLimit.retryAfterSec} сек. или позвоните.`,
        },
        { status: 429 },
      );
    }

    const json = await request.json();
    const data = bookingSchema.parse(json);

    if (data.website?.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const phoneDigits = data.phone.replace(/\D/g, "");
    const phoneLimit = rateLimit(`phone:${phoneDigits}`, 3, 60 * 60 * 1000);
    if (!phoneLimit.ok) {
      return NextResponse.json(
        {
          error:
            "С этого номера уже несколько заявок. Подождите или позвоните нам напрямую.",
        },
        { status: 429 },
      );
    }

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

    const start = parseLocalDate(data.startDate);
    const end = parseLocalDate(data.endDate);
    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end < start
    ) {
      return NextResponse.json({ error: "Некорректные даты" }, { status: 400 });
    }

    const stock = sizeAttr.stockQuantity;
    const existing = await prisma.booking.findMany({
      where: {
        productId: product.id,
        size: data.size,
        status: "new",
      },
      select: { startDate: true, endDate: true },
    });

    const overlapping = existing.filter((b) =>
      datesOverlap(start, end, b.startDate, b.endDate),
    );

    if (overlapping.length >= stock) {
      return NextResponse.json(
        {
          error:
            "На эти даты выбранный размер уже занят. Выберите другие даты или размер, либо позвоните — подберём вариант.",
        },
        { status: 409 },
      );
    }

    const calc = calculateRental(
      start,
      end,
      product.pricePerDay,
      product.marketValue,
    );

    const booking = await prisma.booking.create({
      data: {
        productId: product.id,
        size: data.size,
        startDate: start,
        endDate: end,
        days: calc.days,
        totalRentalPrice: calc.totalRentalPrice,
        refundableDeposit: calc.refundableDeposit,
        totalDueAtPickup: calc.totalDueAtPickup,
        clientName: data.name.trim(),
        phone: data.phone,
        contactMethod: data.contactMethod,
        status: "new",
        telegramNotified: false,
      },
    });

    const telegram = await sendBookingTelegram({
      bookingId: booking.id,
      clientName: data.name.trim(),
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

    if (telegram.skipped && !allowTelegramSkip()) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "cancelled" },
      });
      return NextResponse.json(
        {
          error:
            "Сейчас заявки не принимаются онлайн. Позвоните или напишите в Telegram — подтвердим бронь вручную.",
        },
        { status: 503 },
      );
    }

    if (!telegram.ok) {
      return NextResponse.json(
        {
          error:
            "Заявка сохранена, но уведомление не ушло. Позвоните нам — подтвердим бронь быстрее.",
          bookingId: booking.id,
        },
        { status: 502 },
      );
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: { telegramNotified: !telegram.skipped },
    });

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
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
