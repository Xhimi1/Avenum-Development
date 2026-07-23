'use client';

import LegalPage, { type LegalSection } from './LegalPage';

const TITLE = { en: 'Privacy Policy', sq: 'Politika e Privatësisë' };

const SECTIONS: LegalSection[] = [
  {
    heading: { en: 'Who we are', sq: 'Kush jemi ne' },
    body: [
      {
        en: 'Avenum is a web development agency based in Tirana, Albania, building websites, web apps and AI chatbots for businesses — mainly restaurants.',
        sq: 'Avenum është një agjenci web me bazë në Tiranë, Shqipëri, që ndërton faqe interneti, aplikacione web dhe AI chatbot për biznese — kryesisht restorante.',
      },
    ],
  },
  {
    heading: { en: 'What information we collect', sq: 'Çfarë informacioni mbledhim' },
    body: [
      {
        en: 'We only collect information you choose to share with us — for example your name, phone number, email or project details when you contact us via WhatsApp, email or this website.',
        sq: 'Ne mbledhim vetëm informacionin që ti zgjedh të na e ndash — për shembull emrin, numrin e telefonit, email-in ose detajet e projektit kur na kontakton përmes WhatsApp, email-it ose kësaj faqeje.',
      },
      {
        en: 'Like most websites, our hosting provider may automatically log basic technical data (such as IP address and browser type) for security and performance purposes.',
        sq: 'Ashtu si shumica e faqeve, hosting-u ynë mund të regjistrojë automatikisht të dhëna teknike bazike (si adresa IP dhe lloji i browser-it) për arsye sigurie dhe performance.',
      },
    ],
  },
  {
    heading: { en: 'How we use your information', sq: 'Si e përdorim informacionin' },
    body: [
      {
        en: 'We use it to reply to your inquiry, prepare a quote, and deliver the service you asked for. We never use it for anything else without asking you first.',
        sq: 'E përdorim për t’iu përgjigjur pyetjes tënde, për të përgatitur një ofertë, dhe për të ofruar shërbimin që ke kërkuar. Nuk e përdorim për asgjë tjetër pa të pyetur më parë.',
      },
    ],
  },
  {
    heading: { en: 'Sharing your information', sq: 'Ndarja e informacionit' },
    body: [
      {
        en: "We don't sell your information. We only share it with third-party tools needed to deliver your project (for example a hosting provider or payment processor), and only with your knowledge.",
        sq: 'Ne nuk e shesim informacionin tënd. E ndajmë vetëm me mjete të palëve të treta që janë të domosdoshme për projektin tënd (për shembull një ofrues hosting-u ose pagese), dhe gjithmonë në dijeninë tënde.',
      },
    ],
  },
  {
    heading: { en: 'Your rights', sq: 'Të drejtat e tua' },
    body: [
      {
        en: 'You can ask us at any time what information we hold about you, or ask us to correct or delete it — just send us an email.',
        sq: 'Mund të na pyesësh në çdo kohë çfarë informacioni kemi për ty, ose të na kërkosh ta korrigjojmë apo ta fshijmë — thjesht na dërgo një email.',
      },
    ],
  },
  {
    heading: { en: 'Changes to this policy', sq: 'Ndryshime në këtë politikë' },
    body: [
      {
        en: 'We may update this policy from time to time. The date at the top of this page always shows the latest version.',
        sq: 'Kjo politikë mund të përditësohet herë pas here. Data në krye të kësaj faqeje tregon gjithmonë versionin më të fundit.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title={TITLE} sections={SECTIONS} />;
}
