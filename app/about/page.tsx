import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About — Avenum',
  description:
    'Avenum is a web agency based in Tirana building fast, unique, professional websites — mainly for restaurants — for 3+ years.',
};

export default function Page() {
  return <AboutPage />;
}
