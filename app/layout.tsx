import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@fontsource/libertinus-serif/400.css';
import '@fontsource/libertinus-serif/600.css';
import '@fontsource/libertinus-serif/700.css';
import PageWash from '@/components/ui/PageWash';
import BookCallPill from '@/components/ui/BookCallPill';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

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
    <html lang="sq" className={jakartaBody.variable}>
      <body className="bg-[#050a30] font-body text-[#f2f4ff] antialiased">
        <PageWash />
        {children}
        <BookCallPill />
        <CookieConsent />
      </body>
    </html>
  );
}
