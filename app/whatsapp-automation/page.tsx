import type { Metadata } from 'next';
import WhatsappAutomationPage from '@/components/services/WhatsappAutomationPage';

export const metadata: Metadata = {
  title: 'WhatsApp Automation — Avenum',
  description: 'Reach customers where they already chat — WhatsApp replies and offers sent automatically.',
};

export default function Page() {
  return <WhatsappAutomationPage />;
}
