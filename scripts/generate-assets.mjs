import sharp from "sharp";
import { readFileSync } from "fs";

const svg = readFileSync("public/icon.svg");

await sharp(svg).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(svg).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(svg).resize(32, 32).png().toFile("public/favicon-32.png");

for (const name of ["jk902-1", "jk902-2"]) {
  const src = `public/products/${name}.jpg`;
  await sharp(src).webp({ quality: 82 }).toFile(`public/products/${name}.webp`);
  await sharp(src)
    .resize(800)
    .webp({ quality: 80 })
    .toFile(`public/products/${name}-800.webp`);
  await sharp(src)
    .resize(1200)
    .webp({ quality: 80 })
    .toFile(`public/products/${name}-1200.webp`);
}

const product = await sharp("public/products/jk902-1.jpg")
  .resize(520, 520, {
    fit: "contain",
    background: { r: 9, g: 9, b: 11, alpha: 1 },
  })
  .toBuffer();

const ogSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#09090b"/>
  <defs>
    <radialGradient id="g" cx="70%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="220" fill="#fafafa" font-family="Arial,sans-serif" font-size="72" font-weight="800">MotoRent36</text>
  <text x="72" y="300" fill="#fbbf24" font-family="Arial,sans-serif" font-size="36" font-weight="600">Аренда мотошлема в Воронеже</text>
  <text x="72" y="360" fill="#a1a1aa" font-family="Arial,sans-serif" font-size="26">от 500 ₽/сутки · бронь по телефону</text>
</svg>`);

await sharp(ogSvg)
  .composite([{ input: product, left: 620, top: 55 }])
  .jpeg({ quality: 88 })
  .toFile("public/og.jpg");

console.log("ASSETS_OK");
