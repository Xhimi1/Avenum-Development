import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import PageWash from '@/components/ui/PageWash';
import BookCallPill from '@/components/ui/BookCallPill';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

/** Display: Opening Hours Sans (self-hosted, SIL OFL — see
 *  app/fonts/opening-hours-sans/LICENSE.md), a single Regular weight; the
 *  site's font-medium/font-semibold heading classes fall back to the
 *  browser's synthetic bold since no separate bold weight file exists.
 *  Body: Inter, which holds up at small sizes. */
const openingHoursSans = localFont({
  src: [
    { path: './fonts/opening-hours-sans/OpeningHoursSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/opening-hours-sans/OpeningHoursSans-Regular.woff', weight: '400', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avenum — Faqe web për restorante & biznese',
  description:
    'Avenum është një agjenci web që ndërton faqe web të bukura, të shpejta dhe unike — kryesisht për restorante, që i dallojnë nga konkurrenca dhe u sjellin më shumë klientë.',
  openGraph: {
    title: 'Avenum — Faqe web për restorante & biznese',
    description:
      'Faqe web, aplikacione web dhe AI chatbot — ndërtuar me strategji, dizajn premium dhe SEO të përfshirë.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq" className={`${openingHoursSans.variable} ${inter.variable}`}>
      <body className="bg-black font-body text-white antialiased">
        <PageWash />
        {children}
        <BookCallPill />
        <CookieConsent />
      </body>
    </html>
  );
}
