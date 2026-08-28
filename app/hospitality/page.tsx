import type { Metadata } from 'next';
import HospitalityPage from '@/components/hospitality/HospitalityPage';

export const metadata: Metadata = {
  title: 'Avenum Hospitality — Websites for Restaurants & Hotels',
  description:
    'Avenum builds websites and apps for restaurants and hotels — readable menus, real booking, no templates.',
};

export default function Page() {
  return <HospitalityPage />;
}
