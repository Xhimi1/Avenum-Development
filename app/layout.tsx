import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import PageWash from '@/components/ui/PageWash';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avenum — We build worlds on the web',
  description:
    'Avenum is a web development agency crafting immersive, interactive digital experiences — 3D worlds, kinetic interfaces and products that feel alive.',
  openGraph: {
    title: 'Avenum — We build worlds on the web',
    description:
      'Immersive websites, web apps and e-commerce with 3D, motion and craft.',
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
    <html lang="en" className={jakarta.variable}>
      <body className="bg-[#050a30] font-body text-[#f2f4ff] antialiased">
        <PageWash />
        {children}
      </body>
    </html>
  );
}
