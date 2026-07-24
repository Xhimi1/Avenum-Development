import type { Metadata } from 'next';
import MultiLanguagePage from '@/components/services/MultiLanguagePage';

export const metadata: Metadata = {
  title: 'Multi-Language Websites — Avenum',
  description: 'One website, every visitor — in the language they speak. Reach more people across Albania and beyond.',
};

export default function Page() {
  return <MultiLanguagePage />;
}
