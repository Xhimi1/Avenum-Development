import type { Metadata } from 'next';
import ChatbotsPage from '@/components/chatbots/ChatbotsPage';

export const metadata: Metadata = {
  title: 'AI Chatbots for Restaurants & Gyms — Avenum',
  description:
    'Avenum builds AI assistants that answer guests, book tables and sign up gym members 24/7 — trained on your business, wired into your tools.',
};

export default function Page() {
  return <ChatbotsPage />;
}
