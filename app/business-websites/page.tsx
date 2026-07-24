import type { Metadata } from 'next';
import BusinessWebsitesPage from '@/components/services/BusinessWebsitesPage';

export const metadata: Metadata = {
  title: 'Business Websites — Avenum',
  description: 'Fast, unique websites that make your business look premium — built in Albania by Avenum.',
};

export default function Page() {
  return <BusinessWebsitesPage />;
}
