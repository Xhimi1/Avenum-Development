import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import PageWash from '@/components/ui/PageWash';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avenum — Faqe interneti për restorante & biznese',
  description:
    'Avenum është një agjenci web që ndërton faqe interneti të bukura, të shpejta dhe unike — kryesisht për restorante, që i dallojnë nga konkurrenca dhe u sjellin më shumë klientë.',
  openGraph: {
    title: 'Avenum — Faqe interneti për restorante & biznese',
    description:
      'Faqe interneti, aplikacione web dhe AI chatbot — ndërtuar me strategji, dizajn premium dhe SEO të përfshirë.',
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
    <html lang="sq" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-[#050a30] font-body text-[#f2f4ff] antialiased">
        <PageWash />
        {children}
      </body>
    </html>
  );
}
