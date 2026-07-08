'use client';

import dynamic from 'next/dynamic';
import ServiceLandingPage, { type ServiceFeature } from './ServiceLandingPage';

const ImmersiveGraphic = dynamic(() => import('./graphics/ImmersiveGraphic'));

const ACCENT = '#2451f0';
const ACCENT2 = '#22c1dc';

function IconScroll({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 3v14M12 17l-4-4M12 17l4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
    </svg>
  );
}
function IconCube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}
function IconSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}
function IconGauge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 16 9" />
      <path d="M4 15h.01M20 15h.01M12 6.5v.01" />
    </svg>
  );
}

const FEATURES: ServiceFeature[] = [
  {
    icon: IconCube,
    title: { en: '3D & WebGL scenes', sq: 'Skena 3D & WebGL' },
    desc: {
      en: 'Custom-built worlds and objects that turn a homepage into a place people want to explore.',
      sq: "Botë dhe objekte të ndërtuara posaçërisht që e kthejnë faqen kryesore në një vend që njerëzit duan ta eksplorojnë.",
    },
  },
  {
    icon: IconScroll,
    title: { en: 'Scroll-driven storytelling', sq: 'Tregim përmes scroll-it' },
    desc: {
      en: 'Every scroll reveals the next beat — paced like a film, not a page of stacked sections.',
      sq: 'Çdo lëvizje e scroll-it zbulon momentin tjetër — me ritmin e një filmi, jo të një faqeje me seksione të grumbulluara.',
    },
  },
  {
    icon: IconSpark,
    title: { en: 'Motion & micro-interactions', sq: 'Animacione & mikro-ndërveprime' },
    desc: {
      en: 'Cursors, transitions and hover states tuned until the site feels alive under your hand.',
      sq: 'Kursorë, tranzicione dhe efekte hover të rregulluara derisa faqja ndihet e gjallë nën duart tuaja.',
    },
  },
  {
    icon: IconGauge,
    title: { en: 'Built to convert', sq: 'Ndërtuar për të konvertuar' },
    desc: {
      en: 'Spectacle with a job to do — every scene points toward the action you actually want.',
      sq: 'Spektakël me qëllim — çdo skenë të drejton drejt veprimit që dëshiron realisht.',
    },
  },
];

export default function ImmersiveWebsitesPage() {
  return (
    <ServiceLandingPage
      accent={ACCENT}
      accent2={ACCENT2}
      heading={{
        en: 'Websites people remember for the story, not the loading time.',
        sq: 'Faqe interneti që njerëzit i mbajnë mend për historinë, jo për kohën e ngarkimit.',
      }}
      subheading={{
        en: 'Story-driven marketing sites and 3D worlds that make brands unforgettable — designed to feel like an experience, not a brochure.',
        sq: "Faqe marketingu me histori dhe botë 3D që i bëjnë markat të paharrueshme — të krijuara për t'u ndjerë si eksperiencë, jo si broshurë.",
      }}
      graphic={<ImmersiveGraphic />}
      featuresHeading={{
        en: 'Everything a story-driven site needs.',
        sq: 'Gjithçka që i duhet një faqeje me histori.',
      }}
      features={FEATURES}
      buildHeading={{ en: 'How we build it.', sq: 'Si e ndërtojmë.' }}
      buildSub={{
        en: 'From first sketch to a site that ships — nothing hidden, nothing generic.',
        sq: 'Nga skica e parë deri te faqja që publikohet — asgjë e fshehur, asgjë gjenerike.',
      }}
      buildSteps={[
        {
          phase: '01',
          title: { en: 'We find the story', sq: 'Gjejmë historinë' },
          desc: {
            en: 'Your brand, your audience, the one thing you want visitors to feel — before a single pixel gets made.',
            sq: 'Marka jote, audienca jote, ajo gjë e vetme që do të ndjejnë vizitorët — para se të krijohet edhe një piksel.',
          },
        },
        {
          phase: '02',
          title: { en: 'The world takes shape', sq: 'Bota merr formë' },
          desc: {
            en: 'Art direction, 3D concepts and a scroll script you can click through before we write production code.',
            sq: 'Drejtim artistik, koncepte 3D dhe një skenar scroll-i që mund ta shohësh para se të shkruajmë kodin final.',
          },
        },
        {
          phase: '03',
          title: { en: 'Engineered for speed', sq: 'Ndërtuar për shpejtësi' },
          desc: {
            en: 'Production-grade React, Three.js and motion — optimized so the spectacle never costs you load time.',
            sq: 'React, Three.js dhe animacione në nivel produksioni — të optimizuara që spektakli të mos kushtojë kohë ngarkimi.',
          },
        },
        {
          phase: '04',
          title: { en: 'Live, then sharpened', sq: 'Online, pastaj i përsosur' },
          desc: {
            en: 'We watch real analytics and polish the moments that matter most after launch.',
            sq: 'Ndjekim analitikat reale dhe përsosim momentet më të rëndësishme pas lançimit.',
          },
        },
      ]}
      ctaHeading={{
        en: 'Ready to build a site worth remembering?',
        sq: 'Gati të ndërtojmë një faqe që vlen të mbahet mend?',
      }}
      ctaSub={{
        en: "Tell us about your brand — we'll reply with ideas and a realistic plan.",
        sq: 'Na trego për markën tënde — do të përgjigjemi me ide dhe një plan realist.',
      }}
      ctaLabel={{ en: 'Start your website', sq: 'Nis faqen tënde' }}
      mailSubject={{
        en: 'Immersive website for my business',
        sq: 'Faqe interneti imersive për biznesin tim',
      }}
    />
  );
}
