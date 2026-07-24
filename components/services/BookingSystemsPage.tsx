'use client';

import ServicePage from './ServicePage';
import { BookingHero, TileSlots, TileGuests, TileReminder } from './graphics/BookingGraphics';

export default function BookingSystemsPage() {
  return (
    <ServicePage
      accent="#2FA76A"
      accent2="#7FD8AC"
      heading={{ en: 'Reservations while you sleep.', sq: 'Rezervime edhe kur fle.' }}
      subheading={{
        en: 'Guests book straight from your site — no calls, no missed tables.',
        sq: 'Klientët rezervojnë drejt nga faqja — pa telefonata, pa tavolina të humbura.',
      }}
      ctaLabel={{ en: 'Add booking', sq: 'Shto rezervime' }}
      heroGraphic={<BookingHero />}
      showcaseHeading={{ en: 'Everything in one place.', sq: 'Gjithçka në një vend.' }}
      tiles={[
        { graphic: <TileSlots />, title: { en: 'Pick a time', sq: 'Zgjidh një orar' } },
        { graphic: <TileGuests />, title: { en: 'Manage guests', sq: 'Menaxho klientët' } },
        { graphic: <TileReminder />, title: { en: 'Auto reminders', sq: 'Kujtesa automatike' } },
      ]}
      ctaHeading={{ en: 'Fill every table.', sq: 'Mbush çdo tavolinë.' }}
      mailSubject={{ en: 'Booking system for my business', sq: 'Sistem rezervimi për biznesin tim' }}
    />
  );
}
