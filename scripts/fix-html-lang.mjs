#!/usr/bin/env node
/**
 * Next.js App Router допускает только ОДИН <html> тег на всё приложение
 * (в корневом layout.tsx), поэтому все нелокализованные страницы
 * (/en/*, /fr/*, ...) выходят из сборки со статичным <html lang="ru">.
 *
 * Этот постбилд-скрипт проходит по статике в out/{locale}/**\/*.html
 * и переписывает атрибут lang на правильный код языка. Запускается
 * после `next build` (см. package.json → "build").
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");

const LOCALE_HREFLANG = {
  en: "en",
  fr: "fr",
  zh: "zh",
  uz: "uz",
  hy: "hy",
  az: "az",
  tg: "tg",
  ky: "ky",
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const st = await stat(OUT_DIR).catch(() => null);
  if (!st) {
    console.warn("[fix-html-lang] out/ не найден — пропускаю");
    return;
  }

  let fixed = 0;
  for (const [locale, hreflang] of Object.entries(LOCALE_HREFLANG)) {
    const localeDir = path.join(OUT_DIR, locale);
    const dirStat = await stat(localeDir).catch(() => null);
    if (!dirStat) continue;

    const files = await walk(localeDir);
    for (const file of files) {
      const html = await readFile(file, "utf8");
      const patched = html.replace(
        /<html lang="ru"/,
        `<html lang="${hreflang}"`,
      );
      if (patched !== html) {
        await writeFile(file, patched, "utf8");
        fixed++;
      }
    }
  }

  console.log(`[fix-html-lang] исправлено файлов: ${fixed}`);
}

main().catch((err) => {
  console.error("[fix-html-lang] ошибка:", err);
  process.exit(1);
});
