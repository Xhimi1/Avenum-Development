import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import PageWash from '@/components/ui/PageWash';
import BookCallPill from '@/components/ui/BookCallPill';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

const clashDisplay = localFont({
  src: [
    { path: '../fonts/clash-display/ClashDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/clash-display/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/clash-display/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/clash-display/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const jakartaBody = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
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
  themeColor: '#050a30',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq" className={`${clashDisplay.variable} ${jakartaBody.variable}`}>
      <body className="bg-[#050a30] font-body text-[#f2f4ff] antialiased">
        <PageWash />
        {children}
        <BookCallPill />
        <CookieConsent />
      </body>
    </html>
  );
}
