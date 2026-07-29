import type { Metadata } from 'next';
import KroniPaymentPage from '@/components/pay/KroniPaymentPage';

export const metadata: Metadata = {
  title: 'Payment — Avenum',
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <KroniPaymentPage />;
}
