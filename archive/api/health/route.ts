import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbOk = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {
    dbOk = false;
  }

  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const siteUrlPublic = Boolean(
    siteUrl && !/localhost|127\.0\.0\.1/i.test(siteUrl),
  );
  const metrikaConfigured = Boolean(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  const isProd = process.env.NODE_ENV === "production";
  const allowSkip = process.env.ALLOW_TELEGRAM_SKIP === "1";
  const bookingOnline = telegramConfigured || !isProd || allowSkip;

  const readyForAds =
    dbOk && telegramConfigured && siteUrlPublic && metrikaConfigured;

  const status = dbOk && bookingOnline ? 200 : 503;

  return NextResponse.json(
    {
      ok: status === 200,
      readyForAds,
      checks: {
        dbOk,
        telegramConfigured,
        siteUrlPublic,
        metrikaConfigured,
        bookingOnline,
      },
    },
    { status },
  );
}
