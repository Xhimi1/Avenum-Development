'use client';

import dynamic from 'next/dynamic';
import ServiceLandingPage, { type ServiceFeature } from './ServiceLandingPage';

const PlatformGraphic = dynamic(() => import('./graphics/PlatformGraphic'));

const ACCENT = '#6a3df5';
const ACCENT2 = '#3b82f6';

function IconLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}
function IconChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M4 20h16" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 3 5 6v5.5c0 4.2 3 7.4 7 9.5 4-2.1 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconRefresh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
  );
}

const FEATURES: ServiceFeature[] = [
  {
    icon: IconLayers,
    title: { en: 'Design systems', sq: 'Sisteme dizajni' },
    desc: {
      en: 'A component library your team can actually reuse — consistent, documented, built to grow.',
      sq: "Një bibliotekë komponentësh që ekipi yt mund ta ripërdorë vërtet — konsistente, e dokumentuar, e ndërtuar për t'u zgjeruar.",
    },
  },
  {
    icon: IconChart,
    title: { en: 'Dashboards & data', sq: 'Dashboard-e & të dhëna' },
    desc: {
      en: 'Complex data made legible: fast tables, clear charts, filters that don’t fight the user.',
      sq: 'Të dhëna komplekse të bëra të kuptueshme: tabela të shpejta, grafikë të qartë, filtra që nuk e vështirësojnë punën e përdoruesit.',
    },
  },
  {
    icon: IconShield,
    title: { en: 'Solid architecture', sq: 'Arkitekturë solide' },
    desc: {
      en: 'Auth, permissions and data modeled right the first time, so scaling doesn’t mean rebuilding.',
      sq: 'Autentifikimi, lejet dhe të dhënat të modeluara saktë që në fillim, që shkallëzimi të mos kërkojë rindërtim.',
    },
  },
  {
    icon: IconRefresh,
    title: { en: 'Built to keep shipping', sq: 'Ndërtuar për të vazhduar zhvillimin' },
    desc: {
      en: 'Clean code and real tests, so your team can keep adding features long after we hand it over.',
      sq: 'Kod i pastër dhe teste reale, që ekipi yt të vazhdojë të shtojë veçori edhe pas dorëzimit.',
    },
  },
];

export default function WebAppsPage() {
  return (
    <ServiceLandingPage
      accent={ACCENT}
      accent2={ACCENT2}
      heading={{
        en: 'Products that scale without losing their soul.',
        sq: 'Produkte që shkallëzohen pa humbur shpirtin.',
      }}
      subheading={{
        en: 'Design systems, dashboards and products engineered to grow with your business — opinionated where it counts, flexible everywhere else.',
        sq: 'Sisteme dizajni, dashboard-e dhe produkte të ndërtuara për të rritur bashkë me biznesin tënd — të vendosura aty ku ka rëndësi, fleksibël kudo tjetër.',
      }}
      graphic={<PlatformGraphic />}
      featuresHeading={{
        en: 'Everything a real product needs.',
        sq: 'Gjithçka që i duhet një produkti të vërtetë.',
      }}
      features={FEATURES}
      buildHeading={{ en: 'How we build it.', sq: 'Si e ndërtojmë.' }}
      buildSub={{
        en: 'Software that still makes sense a year from now, not just on launch day.',
        sq: 'Software që ka kuptim edhe pas një viti, jo vetëm ditën e lançimit.',
      }}
      buildSteps={[
        {
          phase: '01',
          title: { en: 'We map the product', sq: 'Hartëzojmë produktin' },
          desc: {
            en: 'Users, workflows, data — the shape of the problem before we touch a design tool.',
            sq: 'Përdoruesit, rrjedhat e punës, të dhënat — forma e problemit para se të prekim ndonjë mjet dizajni.',
          },
        },
        {
          phase: '02',
          title: { en: 'The foundations get decided', sq: 'Vendosim themelet' },
          desc: {
            en: 'Data models, permissions and integrations planned so scaling later doesn’t mean rewriting.',
            sq: 'Modelet e të dhënave, lejet dhe integrimet planifikohen që shkallëzimi më vonë të mos kërkojë rishkrim.',
          },
        },
        {
          phase: '03',
          title: { en: 'Shipped in reviewable slices', sq: 'Dorëzuar në pjesë të rishikueshme' },
          desc: {
            en: 'You see working software every week, not a black box that appears at the end.',
            sq: "Sheh software funksional çdo javë, jo një 'kuti të zezë' që shfaqet vetëm në fund.",
          },
        },
        {
          phase: '04',
          title: { en: 'Live, then supported', sq: 'Online, pastaj i mbështetur' },
          desc: {
            en: 'Monitoring, fixes and new features — we stay on as your product grows.',
            sq: 'Monitorim, rregullime dhe veçori të reja — qëndrojmë pranë ndërsa produkti yt rritet.',
          },
        },
      ]}
      ctaHeading={{
        en: "Have a product idea? Let's architect it right.",
        sq: 'Ke një ide produkti? Le ta arkitekturojmë si duhet.',
      }}
      ctaSub={{
        en: "Tell us what you're building — we'll reply with a plan and an honest timeline.",
        sq: 'Na trego çfarë po ndërton — do të përgjigjemi me një plan dhe një afat të sinqertë.',
      }}
      ctaLabel={{ en: 'Start your product', sq: 'Nis produktin tënd' }}
      mailSubject={{ en: 'Web app / platform project', sq: 'Projekt aplikacioni web / platforme' }}
    />
  );
}
