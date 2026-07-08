import type { Metadata } from 'next';
import CreativeDevelopmentPage from '@/components/services/CreativeDevelopmentPage';

export const metadata: Metadata = {
  title: 'Creative Development — Avenum',
  description:
    'WebGL, shaders and motion — the details people screenshot. Built by Avenum.',
};

export default function Page() {
  return <CreativeDevelopmentPage />;
}
