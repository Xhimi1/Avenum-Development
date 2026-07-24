'use client';

import ServicePage from './ServicePage';
import { LanguageHero, TileToggle, TileMirror, TileReach } from './graphics/LanguageGraphics';

export default function MultiLanguagePage() {
  return (
    <ServicePage
      accent="#7A3CE0"
      accent2="#FF6FA5"
      vividHero
      heading={{ en: 'One site, every language.', sq: 'Një faqe, çdo gjuhë.' }}
      subheading={{
        en: 'Every visitor reads your site in the language they speak.',
        sq: 'Çdo vizitor e lexon faqen në gjuhën që flet.',
      }}
      ctaLabel={{ en: 'Go multi-language', sq: 'Bëje shumëgjuhëshe' }}
      heroGraphic={<LanguageHero />}
      showcaseHeading={{ en: 'Speak everyone’s language.', sq: 'Fol gjuhën e secilit.' }}
      tiles={[
        { graphic: <TileToggle />, title: { en: 'One-tap switch', sq: 'Ndërro me një prekje' } },
        { graphic: <TileMirror />, title: { en: 'Fully translated', sq: 'Plotësisht i përkthyer' } },
        { graphic: <TileReach />, title: { en: 'Reach more people', sq: 'Arri më shumë njerëz' } },
      ]}
      ctaHeading={{ en: 'Welcome the whole world.', sq: 'Mirëprit të gjithë botën.' }}
      mailSubject={{ en: 'Multi-language website', sq: 'Faqe shumëgjuhëshe' }}
    />
  );
}
