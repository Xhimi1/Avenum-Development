import type { Metadata } from 'next';
import PortfolioPage from '@/components/portfolio/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio — Avenum',
  description: 'A full look at the websites, chatbots and tools Avenum has designed, built and shipped.',
};

export default function Page() {
  return <PortfolioPage />;
}
