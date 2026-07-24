import type { Metadata } from 'next';
import MaintenanceSupportPage from '@/components/services/MaintenanceSupportPage';

export const metadata: Metadata = {
  title: 'Maintenance & Support — Avenum',
  description: 'We keep your site fast, secure and up to date — monthly plans so you never think about it.',
};

export default function Page() {
  return <MaintenanceSupportPage />;
}
