import type { Metadata } from 'next';
import BookingSystemsPage from '@/components/services/BookingSystemsPage';

export const metadata: Metadata = {
  title: 'Booking & Reservations — Avenum',
  description: 'Let customers book and reserve straight from your website — no calls, no missed tables.',
};

export default function Page() {
  return <BookingSystemsPage />;
}
