'use client';

import LegalPage, { type LegalSection } from './LegalPage';

const TITLE = { en: 'Cookie Policy', sq: 'Politika e Cookies' };

const SECTIONS: LegalSection[] = [
  {
    heading: { en: 'What this policy covers', sq: 'Çfarë përfshin kjo politikë' },
    body: [
      {
        en: 'This page explains the analytics we use on this website, and the choice you make in the cookie banner shown on your first visit.',
        sq: 'Kjo faqe shpjegon analitikën që përdorim në këtë website, dhe zgjedhjen që bën në banerin e cookies që shfaqet në vizitën tënde të parë.',
      },
    ],
  },
  {
    heading: { en: 'What we use', sq: 'Çfarë përdorim' },
    body: [
      {
        en: "We use Vercel Analytics to see how many people visit this site and which pages they read — it's privacy-friendly by design and doesn't set a tracking cookie or collect any personal data.",
        sq: 'Përdorim Vercel Analytics për të parë sa persona vizitojnë këtë faqe dhe cilat faqe lexojnë — është miqësor me privatësinë nga dizajni dhe nuk vendos cookie gjurmuese apo mbledh të dhëna personale.',
      },
      {
        en: 'We never use advertising or cross-site tracking cookies, and we never sell visitor data.',
        sq: 'Nuk përdorim kurrë cookies reklamimi apo gjurmimi ndër-faqesh, dhe nuk shesim kurrë të dhënat e vizitorëve.',
      },
    ],
  },
  {
    heading: { en: 'Your choice', sq: 'Zgjedhja jote' },
    body: [
      {
        en: 'When you first visit, a banner asks whether to accept or reject analytics. Accepting turns Analytics on; rejecting keeps it off entirely. Either way, your choice is remembered on this device so the banner won’t show again.',
        sq: 'Në vizitën e parë, një baner të pyet nëse do të pranosh apo refuzosh analitikën. Nëse pranon, Analytics aktivizohet; nëse refuzon, mbetet plotësisht joaktive. Në të dyja rastet, zgjedhja jote ruhet në këtë pajisje që baneri të mos shfaqet përsëri.',
      },
      {
        en: 'To change your mind later, clear this site’s data/local storage in your browser settings and reload the page — the banner will appear again.',
        sq: 'Për ta ndryshuar më vonë, pastro të dhënat/local storage e kësaj faqeje te cilësimet e browser-it dhe ringarko faqen — baneri do të shfaqet përsëri.',
      },
    ],
  },
  {
    heading: { en: 'Third-party links', sq: 'Lidhje palësh të treta' },
    body: [
      {
        en: 'Buttons on this site may take you to WhatsApp or PayPal to continue a conversation or payment. Those services have their own privacy and cookie practices, outside our control.',
        sq: 'Disa butona në këtë faqe të çojnë te WhatsApp ose PayPal për të vazhduar një bisedë ose pagesë. Ato shërbime kanë praktikat e tyre të privatësisë dhe cookies, jashtë kontrollit tonë.',
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

export default function CookiePolicyPage() {
  return <LegalPage title={TITLE} sections={SECTIONS} />;
}
