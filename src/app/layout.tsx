import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import {
  SEO_CONFIG,
  googleVerification,
  yandexVerification,
} from "@/config/seo";
import { assetUrl, absoluteAssetUrl } from "@/lib/assets";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ogImage = absoluteAssetUrl("/og.jpg");
const iconSvg = assetUrl("/icon.svg");
const icon192 = assetUrl("/icon-192.png");
const icon512 = assetUrl("/icon-512.png");
const appleIcon = assetUrl("/apple-touch-icon.png");
const favicon32 = assetUrl("/favicon-32.png");
const manifestUrl = assetUrl("/manifest.webmanifest");

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s · ${SEO_CONFIG.brandName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.brandName,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "аренда Воронеж",
    "прокат Воронеж",
    "аренда мотошлема Воронеж",
    "прокат шлема Воронеж",
    "аренда инструмента Воронеж",
    "JIEKAI JK902",
    SEO_CONFIG.brandName,
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SEO_CONFIG.brandName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    url: "/",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Beri36 — прокат в Воронеже",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [ogImage],
  },
  ...(yandexVerification || googleVerification
    ? {
        verification: {
          ...(yandexVerification ? { yandex: yandexVerification } : {}),
          ...(googleVerification ? { google: googleVerification } : {}),
        },
      }
    : {}),
  robots: { index: true, follow: true },
  manifest: manifestUrl,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SEO_CONFIG.brandName,
  },
  icons: {
    icon: [
      { url: favicon32, sizes: "32x32", type: "image/png" },
      { url: iconSvg, type: "image/svg+xml" },
      { url: icon192, sizes: "192x192", type: "image/png" },
      { url: icon512, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: appleIcon, sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    // Referrer-Policy работает и как meta-тег (в отличие от HSTS/frame-ancestors).
    referrer: "strict-origin-when-cross-origin",
  },
};

/**
 * CSP через meta-тег — работает на GitHub Pages (HTTP-заголовки там задать нельзя).
 * Разрешены только реально используемые источники: Яндекс.Метрика и карта OpenStreetMap.
 * Полный набор заголовков (HSTS, frame-ancestors, X-Frame-Options) — в public/_headers
 * для хостингов, которые его поддерживают (Cloudflare Pages / Netlify).
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://www.openstreetmap.org",
  "style-src 'self' 'unsafe-inline' https://www.openstreetmap.org",
  "img-src 'self' data: https://mc.yandex.ru https://tile.openstreetmap.org https://www.openstreetmap.org",
  "font-src 'self' data:",
  "connect-src 'self' https://mc.yandex.ru https://hdrc.yandex.net https://mdd.yandex.net https://tile.openstreetmap.org wss://mc.yandex.ru wss://mc.yandex.com wss://mc.webvisor.org",
  "frame-src https://www.openstreetmap.org https://mc.yandex.ru https://mc.yandex.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${body.variable} ${display.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 w-full min-w-0">
          {children}
        </main>
        <SiteFooter />
        <YandexMetrika />
      </body>
    </html>
  );
}
