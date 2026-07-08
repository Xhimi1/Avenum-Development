import type { Metadata } from 'next';
import ImmersiveWebsitesPage from '@/components/services/ImmersiveWebsitesPage';

export const metadata: Metadata = {
  title: 'Immersive Websites — Avenum',
  description:
    'Story-driven marketing sites and 3D worlds that make brands unforgettable — built by Avenum.',
};

export default function Page() {
  return <ImmersiveWebsitesPage />;
}
