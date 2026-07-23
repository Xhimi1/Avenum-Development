import type { Metadata } from 'next';
import ChatbotsPage from '@/components/chatbots/ChatbotsPage';

export const metadata: Metadata = {
  title: 'AI Chatbots for Restaurants — Avenum',
  description:
    'Avenum builds AI assistants that answer guests and book tables 24/7 — trained on your restaurant, wired into your tools.',
};

export default function Page() {
  return <ChatbotsPage />;
}
