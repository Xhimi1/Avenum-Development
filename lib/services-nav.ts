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
    id: 'websites',
    title: { en: 'Business Websites', sq: 'Faqe Biznesi' },
    desc: { en: 'Fast, custom sites that convert.', sq: 'Faqe të shpejta që konvertojnë.' },
    href: '/business-websites',
    accent: '#3B6BFF',
  },
  {
    id: 'chatbot',
    title: { en: 'AI Chatbot', sq: 'AI Chatbot' },
    desc: { en: 'Answers guests and books tables 24/7.', sq: 'U përgjigjet klientëve dhe rezervon 24/7.' },
    href: '/ai-chatbots',
    accent: '#6367FF',
  },
  {
    id: 'booking',
    title: { en: 'Booking & Reservations', sq: 'Rezervime Online' },
    desc: { en: 'Guests book straight from your site.', sq: 'Klientët rezervojnë nga faqja jote.' },
    href: '/booking-systems',
    accent: '#2FA76A',
  },
  {
    id: 'email',
    title: { en: 'Email Automation', sq: 'Automatizim Email-i' },
    desc: { en: 'Confirmations and follow-ups, automated.', sq: 'Konfirmime dhe përgjigje, automatike.' },
    href: '/email-automation',
    accent: '#D99500',
  },
  {
    id: 'whatsapp',
    title: { en: 'WhatsApp Automation', sq: 'Automatizim WhatsApp' },
    desc: { en: 'Instant replies where customers chat.', sq: 'Përgjigje të menjëhershme aty ku bisedojnë.' },
    href: '/whatsapp-automation',
    accent: '#16A97C',
  },
  {
    id: 'multilang',
    title: { en: 'Multi-Language Websites', sq: 'Faqe Shumëgjuhëshe' },
    desc: { en: "One site, every visitor's language.", sq: 'Një faqe, çdo gjuhë vizitori.' },
    href: '/multi-language-websites',
    accent: '#D25C8C',
  },
  {
    id: 'maintenance',
    title: { en: 'Maintenance & Support', sq: 'Mirëmbajtje & Suport' },
    desc: { en: 'Kept fast, secure and up to date.', sq: 'E mbajtur e shpejtë, e sigurt e e përditësuar.' },
    href: '/maintenance-support',
    accent: '#E07B34',
  },
];
