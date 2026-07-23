'use client';

import LegalPage, { type LegalSection } from './LegalPage';

const TITLE = { en: 'Terms of Service', sq: 'Kushtet e Përdorimit' };

const SECTIONS: LegalSection[] = [
  {
    heading: { en: 'Our services', sq: 'Shërbimet tona' },
    body: [
      {
        en: 'Avenum designs and builds websites, web apps and AI chatbots. Every project starts with a conversation so we can agree on scope, timeline and price before any work begins.',
        sq: 'Avenum dizajnon dhe ndërton faqe interneti, aplikacione web dhe AI chatbot. Çdo projekt fillon me një bisedë, në mënyrë që të bihemi dakord për fushëveprimin, kohën dhe çmimin para se të fillojë çdo punë.',
      },
    ],
  },
  {
    heading: { en: 'Pricing & payment', sq: 'Çmimet & pagesat' },
    body: [
      {
        en: 'Prices shown on our pricing page are a starting point. The final price is confirmed together with you before we start, based on your specific project. Payment terms (deposit, installments or full payment) are agreed per project.',
        sq: 'Çmimet e treguara në faqen e çmimeve janë një pikënisje. Çmimi final konfirmohet bashkë me ty para se të fillojmë, bazuar në projektin tënd specifik. Kushtet e pagesës (paradhënie, këste apo pagesë e plotë) bihen dakord për çdo projekt.',
      },
    ],
  },
  {
    heading: { en: 'Delivery timelines', sq: 'Afatet e dorëzimit' },
    body: [
      {
        en: 'Timelines quoted are estimates and depend on how quickly you provide content, feedback and approvals. We will always tell you if something changes the schedule.',
        sq: 'Afatet e dhëna janë vlerësime dhe varen nga sa shpejt na siguron përmbajtjen, feedback-un dhe miratimet. Do të të njoftojmë gjithmonë nëse diçka ndryshon planin kohor.',
      },
    ],
  },
  {
    heading: { en: 'Ownership of your website', sq: 'Pronësia e faqes tënde' },
    body: [
      {
        en: 'Once your project is paid in full, the final website, its content and code belong to you. We may showcase the work in our own portfolio unless you ask us not to.',
        sq: 'Sapo projekti të paguhet plotësisht, faqja finale, përmbajtja dhe kodi i saj të përkasin ty. Ne mund ta paraqesim punën në portofolin tonë, përveçse nëse na kërkon të mos e bëjmë.',
      },
    ],
  },
  {
    heading: { en: 'Cancellations', sq: 'Anulimet' },
    body: [
      {
        en: 'If a project is cancelled partway through, we invoice fairly for the work already completed. Any deposit is non-refundable once work has started, unless agreed otherwise.',
        sq: 'Nëse një projekt anulohet në gjysmë të rrugës, faturojmë në mënyrë të drejtë për punën e kryer deri atëherë. Paradhënia nuk kthehet pasi ka filluar puna, përveçse nëse bihet dakord ndryshe.',
      },
    ],
  },
  {
    heading: { en: 'Governing law', sq: 'Ligji i zbatueshëm' },
    body: [
      {
        en: 'These terms are governed by the laws of the Republic of Albania.',
        sq: 'Këto kushte rregullohen nga ligjet e Republikës së Shqipërisë.',
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return <LegalPage title={TITLE} sections={SECTIONS} />;
}
