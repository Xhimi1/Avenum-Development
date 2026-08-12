import type { Bi } from './i18n';

export interface NavService {
  id: string;
  title: Bi;
  desc: Bi;
  href: string;
  accent: string;
}

/** The full list of individual service pages, used by the navbar's
 *  "Services" dropdown/submenu. */
export const NAV_SERVICES: NavService[] = [
  {
    id: 'chatbot',
    title: { en: 'AI Chatbot', sq: 'AI Chatbot' },
    desc: { en: 'Answers guests and books tables 24/7.', sq: 'U përgjigjet klientëve dhe rezervon 24/7.' },
    href: '/ai-chatbots',
    accent: '#6367FF',
  },
];
