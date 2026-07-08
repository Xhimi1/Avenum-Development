import type { Metadata } from 'next';
import WebAppsPage from '@/components/services/WebAppsPage';

export const metadata: Metadata = {
  title: 'Web Apps & Platforms — Avenum',
  description:
    'Design systems, dashboards and products engineered to scale without losing soul — built by Avenum.',
};

export default function Page() {
  return <WebAppsPage />;
}
