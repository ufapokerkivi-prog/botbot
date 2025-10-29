import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTA from "@/components/MobileCTA";
import Providers from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Вызов нарколога на дом за 30 минут — Круглосуточно и анонимно",
    template: "%s | Наркологическая служба",
  },
  description:
    "Вывод из запоя, снятие похмелья и кодирование. Частная скорая помощь 24/7. Выезд врача на дом в течение 30 минут. Анонимно и конфиденциально.",
  keywords: [
    "наркологическая служба",
    "вызов нарколога на дом",
    "выведение из запоя",
    "снятие похмелья",
    "кодирование",
    "наркологическая помощь",
    "детоксикация",
    "анонимно",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Вызов нарколога на дом за 30 минут — Круглосуточно и анонимно",
    description: "Вывод из запоя, снятие похмелья и кодирование. Частная скорая помощь 24/7. Анонимно и конфиденциально.",
    siteName: "Наркологическая служба",
    url: "https://narcology.example.com",
  },
  icons: {
    icon: [{ url: "/favicon.ico", rel: "icon", sizes: "any" }],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} bg-elevated text-text antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-24 md:pb-0">{children}</main>
            <Footer />
          </div>
          <MobileCTA />
        </Providers>
      </body>
    </html>
  );
}
