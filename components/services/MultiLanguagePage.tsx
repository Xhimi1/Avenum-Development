'use client';

import ServicePage from './ServicePage';
import { LanguageHero, TileToggle, TileMirror, TileReach } from './graphics/LanguageGraphics';

export default function MultiLanguagePage() {
  return (
    <ServicePage
      currentHref="/multi-language-websites"
      accent="#7A3CE0"
      accent2="#FFC93C"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'Multi-Language Websites', sq: 'Faqe Shumëgjuhëshe' }}
      heading={{ en: 'One site, every language.', sq: 'Një faqe, çdo gjuhë.' }}
      subheading={{
        en: 'Foreign visitors leave when your site only speaks Albanian — reach tourists and international customers with every page properly translated, switched instantly. No reload, no awkward machine translation — just a site that feels native in every language it speaks.',
        sq: 'Vizitorët e huaj largohen kur faqja jote flet vetëm shqip — arrij turistë e klientë ndërkombëtarë me çdo faqe të përkthyer si duhet, të ndërrueshme menjëherë. Pa ringarkim, pa përkthim të çuditshëm automatik — thjesht një faqe që ndihet e natyrshme në çdo gjuhë që flet.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<LanguageHero />}
      showcaseHeading={{ en: 'Speak everyone’s language.', sq: 'Fol gjuhën e secilit.' }}
      tiles={[
        {
          graphic: <TileToggle />,
          title: { en: 'One-tap switch', sq: 'Ndërro me një prekje' },
          subtitle: {
            en: 'Visitors flip languages instantly, no reload needed.',
            sq: 'Vizitorët ndërrojnë gjuhën menjëherë, pa u ringarkuar faqja.',
          },
        },
        {
          graphic: <TileMirror />,
          title: { en: 'Fully translated', sq: 'Plotësisht i përkthyer' },
          subtitle: {
            en: 'Every page, button and message translated properly.',
            sq: 'Çdo faqe, buton dhe mesazh i përkthyer si duhet.',
          },
        },
        {
          graphic: <TileReach />,
          title: { en: 'Reach more people', sq: 'Arri më shumë njerëz' },
          subtitle: {
            en: 'Open your business up to visitors from anywhere.',
            sq: 'Hape biznesin tënd për vizitorë nga kudo.',
          },
        },
      ]}
      ctaHeading={{ en: 'Welcome the whole world.', sq: 'Mirëprit të gjithë botën.' }}
    />
  );
}
