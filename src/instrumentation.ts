export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "production") return;

  const missing: string[] = [];
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    if (process.env.ALLOW_TELEGRAM_SKIP !== "1") {
      missing.push("TELEGRAM_BOT_TOKEN/CHAT_ID (заявки → 503)");
    }
  }
  const url = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!url || /localhost|127\.0\.0\.1/i.test(url)) {
    missing.push("NEXT_PUBLIC_SITE_URL (нужен публичный HTTPS)");
  }
  if (!process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) {
    console.warn(
      "[motorent36] WARN: NEXT_PUBLIC_YANDEX_METRIKA_ID не задан — нет статистики для Директа",
    );
  }
  if (missing.length) {
    console.error(
      `[motorent36] PROD NOT READY: ${missing.join("; ")}. См. npm run preflight`,
    );
  } else {
    console.info("[motorent36] production env looks ready for bookings");
  }
}
