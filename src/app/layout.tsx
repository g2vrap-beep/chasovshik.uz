import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHASOVSHIK.UZ — Часовой сервис центр | Ремонт швейцарских часов",
  description: "Профессиональный ремонт и сервис швейцарских часов в Ташкенте. 10+ лет опыта. Экспресс ремонт, полировка, замена батареи, стекла, ремешка. ТЦ NEXT, 1 этаж.",
  keywords: ["ремонт часов", "швейцарские часы", "часовой мастер", "Ташкент", "CHASOVSHIK", "сервис часов", "замена батареи", "полировка часов"],
  authors: [{ name: "CHASOVSHIK.UZ" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CHASOVSHIK.UZ — Часовой сервис центр",
    description: "Профессиональный ремонт швейцарских часов в Ташкенте. 10+ лет опыта.",
    url: "https://chasovshik.uz",
    siteName: "CHASOVSHIK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${montserrat.variable} antialiased bg-background text-foreground overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
