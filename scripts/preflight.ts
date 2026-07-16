/**
 * Проверка готовности к продакшену / рекламе.
 * npm run preflight
 *
 * exit 1 — критичные дыры (Telegram / SITE_URL на проде)
 * exit 0 + warnings — можно поднимать, но Метрика/Вебмастер ещё желательны
 */

import fs from "node:fs";
import path from "node:path";

/** Подтянуть .env в process.env (tsx сам dotenv не грузит). */
function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv();

const isProd = process.env.NODE_ENV === "production";
const allowSkip = process.env.ALLOW_TELEGRAM_SKIP === "1";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const tgToken = process.env.TELEGRAM_BOT_TOKEN || "";
const tgChat = process.env.TELEGRAM_CHAT_ID || "";
const metrika = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "";
const webmaster = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "";

const errors: string[] = [];
const warnings: string[] = [];

console.log("=== MotoRent36 preflight ===");
console.log(`NODE_ENV=${process.env.NODE_ENV || "(unset)"}`);

if (!siteUrl || /localhost|127\.0\.0\.1/i.test(siteUrl)) {
  const msg =
    "NEXT_PUBLIC_SITE_URL должен быть публичным HTTPS-доменом (сейчас localhost или пусто)";
  if (isProd) errors.push(msg);
  else warnings.push(msg);
} else if (!/^https:\/\//i.test(siteUrl)) {
  warnings.push("NEXT_PUBLIC_SITE_URL лучше указать с https://");
}

if (!tgToken || !tgChat) {
  const msg =
    "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы — на проде заявки будут 503";
  if (isProd && !allowSkip) errors.push(msg);
  else warnings.push(msg);
}

if (!metrika) {
  warnings.push(
    "NEXT_PUBLIC_YANDEX_METRIKA_ID пуст — Директ без статистики; цель booking_ok не сработает",
  );
}

if (!webmaster) {
  warnings.push(
    "NEXT_PUBLIC_YANDEX_VERIFICATION пуст — добавьте код из Вебмастера после домена",
  );
}

for (const w of warnings) console.warn("WARN:", w);
for (const e of errors) console.error("ERR:", e);

if (errors.length) {
  console.error(`\nPreflight FAILED (${errors.length} critical).`);
  process.exit(1);
}

console.log(
  warnings.length
    ? `\nPreflight OK with ${warnings.length} warning(s).`
    : "\nPreflight OK — всё критичное на месте.",
);
