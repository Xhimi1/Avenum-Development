import type { Metadata } from 'next';
import CookiePolicyPage from '@/components/legal/CookiePolicyPage';

export const metadata: Metadata = {
  title: 'Cookie Policy — Avenum',
  description: 'The analytics Avenum uses on this site, and how your cookie consent choice works.',
};

export default function Page() {
  return <CookiePolicyPage />;
}
