'use client';

import ServicePage from './ServicePage';
import { MaintenanceHero, TileUptime, TileSecure, TileSupport } from './graphics/MaintenanceGraphics';

export default function MaintenanceSupportPage() {
  return (
    <ServicePage
      accent="#E07B34"
      accent2="#FFB36B"
      heading={{ en: 'We keep it running.', sq: 'Ne e mbajmë në punë.' }}
      subheading={{
        en: 'Fast, secure and up to date — so you never think about it.',
        sq: 'E shpejtë, e sigurt e e përditësuar — që të mos mendosh për të.',
      }}
      ctaLabel={{ en: 'Get support', sq: 'Merr suport' }}
      heroGraphic={<MaintenanceHero />}
      showcaseHeading={{ en: 'Peace of mind, monthly.', sq: 'Qetësi mendore, çdo muaj.' }}
      tiles={[
        { graphic: <TileUptime />, title: { en: 'Always online', sq: 'Gjithmonë online' } },
        { graphic: <TileSecure />, title: { en: 'Kept secure', sq: 'E mbajtur e sigurt' } },
        { graphic: <TileSupport />, title: { en: 'We’re here', sq: 'Ne jemi këtu' } },
      ]}
      ctaHeading={{ en: 'Leave the upkeep to us.', sq: 'Lëna mirëmbajtjen ne.' }}
      mailSubject={{ en: 'Maintenance & support plan', sq: 'Plan mirëmbajtjeje & suporti' }}
    />
  );
}
