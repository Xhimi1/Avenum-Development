import type { Metadata } from 'next';
import { Suspense } from 'react';
import KroniPaymentPage from '@/components/pay/KroniPaymentPage';

export const metadata: Metadata = {
  title: 'Payment — Avenum',
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KroniPaymentPage />
    </Suspense>
  );
}
