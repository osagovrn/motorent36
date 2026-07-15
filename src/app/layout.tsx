import type { Metadata, Viewport } from "next";
import { Manrope, Bebas_Neue } from "next/font/google";
import { SEO_CONFIG } from "@/config/seo";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: `%s · ${SEO_CONFIG.brandName}`,
  },
  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.brandName,
  keywords: [
    "аренда мотошлемов Воронеж",
    "прокат шлема Воронеж",
    "мотоэкипировка напрокат",
    "JIEKAI JK902",
    SEO_CONFIG.brandName,
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SEO_CONFIG.brandName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
