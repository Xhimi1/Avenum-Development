'use client';

import ServicePage from './ServicePage';
import { MaintenanceHeroShowcase, TileUptime, TileSecure, TileSupport } from './graphics/MaintenanceGraphics';

export default function MaintenanceSupportPage() {
  return (
    <ServicePage
      currentHref="/maintenance-support"
      accent="#E07B34"
      accent2="#FFB36B"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'Maintenance & Support', sq: 'Mirëmbajtje & Suport' }}
      heading={{ en: 'We keep it running.', sq: 'Ne e mbajmë në punë.' }}
      subheading={{
        en: 'Most sites get left to rot until something breaks — we monitor, patch and update yours every month, with a real person to call when something goes wrong. Backups, security fixes and small content changes are handled before you even notice a problem.',
        sq: 'Shumica e faqeve lihen pa kujdes derisa diçka prishet — ne e monitorojmë, rregullojmë e përditësojmë çdo muaj, me dikë real për të thirrur kur diçka shkon keq. Backup-e, rregullime sigurie dhe ndryshime të vogla përmbajtjeje kryhen para se ta vësh re problemin.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<MaintenanceHeroShowcase />}
      showcaseHeading={{ en: 'Peace of mind, monthly.', sq: 'Qetësi mendore, çdo muaj.' }}
      tiles={[
        {
          graphic: <TileUptime />,
          title: { en: 'Always online', sq: 'Gjithmonë online' },
          subtitle: {
            en: 'We monitor uptime around the clock, every day.',
            sq: 'Monitorojmë online-in 24 orë në ditë, çdo ditë.',
          },
        },
        {
          graphic: <TileSecure />,
          title: { en: 'Kept secure', sq: 'E mbajtur e sigurt' },
          subtitle: {
            en: 'Updates and patches applied before problems start.',
            sq: 'Përditësime dhe rregullime të aplikuara para se të lindin problemet.',
          },
        },
        {
          graphic: <TileSupport />,
          title: { en: 'We’re here', sq: 'Ne jemi këtu' },
          subtitle: {
            en: 'Real support when something needs a human touch.',
            sq: 'Suport real kur diçka ka nevojë për një dorë njerëzore.',
          },
        },
      ]}
      ctaHeading={{ en: 'Leave the upkeep to us.', sq: 'Lëna mirëmbajtjen ne.' }}
    />
  );
}
