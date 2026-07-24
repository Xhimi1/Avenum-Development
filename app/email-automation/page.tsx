import type { Metadata } from 'next';
import EmailAutomationPage from '@/components/services/EmailAutomationPage';

export const metadata: Metadata = {
  title: 'Email Automation — Avenum',
  description: 'Automatic confirmations and follow-ups that send themselves — hands-free email for your business.',
};

export default function Page() {
  return <EmailAutomationPage />;
}
