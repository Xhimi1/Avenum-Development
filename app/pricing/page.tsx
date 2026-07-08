import type { Metadata } from 'next';
import PricingPage from '@/components/pricing/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing — Avenum',
  description:
    'Clear packages for Albanian businesses — custom websites, motion and AI chatbots at honest prices. Pay in euro or lekë.',
};

export default function Page() {
  return <PricingPage />;
}
