import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import PageWash from '@/components/ui/PageWash';
import BookCallPill from '@/components/ui/BookCallPill';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

/** Display: Plus Jakarta Sans. Headings run extralight (200) — the hero
 *  sits at 300; 500 is kept only for small display-font UI like buttons and
 *  pills, which go illegible if set as thin as the headlines. Body: Inter,
 *  which holds up at small sizes. */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '500'],
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
    <html lang="sq" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-black font-body text-white antialiased">
        <PageWash />
        {children}
        <BookCallPill />
        <CookieConsent />
      </body>
    </html>
  );
}
