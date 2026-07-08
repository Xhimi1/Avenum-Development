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
    title: { en: 'Immersive Websites', sq: 'Faqe Interneti Imersive' },
    desc: {
      en: 'Story-driven marketing sites and 3D worlds that make brands unforgettable.',
      sq: 'Faqe marketingu me histori dhe botë 3D që i bëjnë markat të paharrueshme.',
    },
  },
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
      en: 'Concierge AI for restaurants & gyms — answers guests, books tables and signs up members 24/7.',
      sq: 'AI konsierzh për restorante & palestra — u përgjigjet mysafirëve, rezervon tavolina dhe regjistron anëtarë 24/7.',
    },
    href: '/ai-chatbots',
    tag: { en: 'Hot', sq: 'Hot' },
  },
  {
    title: { en: 'Creative Development', sq: 'Zhvillim Kreativ' },
    desc: {
      en: 'WebGL, shaders and motion. The details people screenshot.',
      sq: 'WebGL, shaders dhe animacione. Detajet që njerëzit bëjnë screenshot.',
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
