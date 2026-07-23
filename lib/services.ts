import type { Bi } from './i18n';

export interface ServiceLink {
  title: Bi;
  desc: Bi;
  href?: string;
  tag?: Bi;
}

/** The services shown as horizontally-scrollable cards on the homepage. */
export const SERVICES: ServiceLink[] = [
  {
    title: { en: 'Web Apps & Platforms', sq: 'Aplikacione & Platforma Web' },
    desc: {
      en: 'Design systems, dashboards and products engineered to scale without losing soul.',
      sq: "Sisteme dizajni, dashboard-e dhe produkte të ndërtuara për t'u shkallëzuar pa humbur shpirtin.",
    },
  },
  {
    title: { en: 'AI Chatbots', sq: 'AI Chatbots' },
    desc: {
      en: 'Concierge AI for restaurants — answers guests and books tables, 24/7.',
      sq: 'AI konsierzh për restorante — u përgjigjet mysafirëve dhe rezervon tavolina, 24/7.',
    },
    href: '/ai-chatbots',
    tag: { en: 'Hot', sq: 'Hot' },
  },
  {
    title: { en: 'Creative Development', sq: 'Zhvillim Kreativ' },
    desc: {
      en: 'Motion and detail that make a site feel premium — the parts people notice.',
      sq: 'Animacione dhe detaje që e bëjnë faqen të ndihet premium — pjesët që njerëzit i vërejnë.',
    },
  },
  {
    title: { en: 'Payment Link', sq: 'Link Pagese' },
    desc: {
      en: 'Send a link, get paid instantly — no card terminal needed.',
      sq: 'Dërgo një link, merr pagesën menjëherë — pa nevojë për POS.',
    },
  },
  {
    title: { en: 'Reservation Form', sq: 'Formular Rezervimi' },
    desc: {
      en: 'Custom booking forms that sync straight into your calendar.',
      sq: 'Formularë rezervimi të personalizuar që sinkronizohen me kalendarin tënd.',
    },
  },
  {
    title: { en: 'Email Automation', sq: 'Automatizim Email-i' },
    desc: {
      en: "Automated sequences that follow up so you don't have to.",
      sq: 'Sekuenca email-i të automatizuara që ndjekin klientët pa u dashur ta bësh vetë.',
    },
  },
  {
    title: { en: 'Security', sq: 'Siguri' },
    desc: {
      en: 'Hardened, monitored and backed up — sleep easy.',
      sq: 'E fortifikuar, e monitoruar dhe me backup — qetësi e plotë.',
    },
  },
  {
    title: { en: 'Web App', sq: 'Aplikacion Web' },
    desc: {
      en: 'A focused web app built around exactly one job.',
      sq: 'Një aplikacion web i fokusuar, i ndërtuar për një qëllim të vetëm.',
    },
  },
];
