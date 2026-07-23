import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/legal/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Avenum',
  description: 'How Avenum collects, uses and protects your information.',
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
