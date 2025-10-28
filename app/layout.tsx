import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Наркологическая служба - Профессиональная помощь 24/7',
    template: '%s | Наркологическая служба',
  },
  description: 'Профессиональная наркологическая служба. Анонимная помощь, вывод из запоя, кодирование, реабилитация. Работаем круглосуточно.',
  keywords: ['наркологическая служба', 'вывод из запоя', 'кодирование', 'лечение алкоголизма', 'наркологическая клиника', 'анонимная помощь'],
  authors: [{ name: 'Наркологическая служба' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://example.com',
    siteName: 'Наркологическая служба',
    title: 'Наркологическая служба - Профессиональная помощь 24/7',
    description: 'Профессиональная наркологическая служба. Анонимная помощь, вывод из запоя, кодирование, реабилитация. Работаем круглосуточно.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Наркологическая служба',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Наркологическая служба - Профессиональная помощь 24/7',
    description: 'Профессиональная наркологическая служба. Анонимная помощь, вывод из запоя, кодирование, реабилитация.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00C8B3" />
      </head>
      <body>{children}</body>
    </html>
  );
}
