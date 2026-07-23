import type { Metadata } from 'next';
import TermsOfServicePage from '@/components/legal/TermsOfServicePage';

export const metadata: Metadata = {
  title: 'Terms of Service — Avenum',
  description: 'The terms that apply when you work with Avenum.',
};

export default function Page() {
  return <TermsOfServicePage />;
}
