'use client';

import ServicePage from './ServicePage';
import { BookingHero, TileSlots, TileGuests, TileReminder } from './graphics/BookingGraphics';

export default function BookingSystemsPage() {
  return (
    <ServicePage
      currentHref="/booking-systems"
      accent="#2FA76A"
      accent2="#7FD8AC"
      heroGradient="linear-gradient(140deg, #2FA0F5 0%, #3E63F0 52%, #8A5CFF 100%)"
      heroBlobs={['#7FD8FF', '#5B7CFF', '#B58BFF']}
      eyebrow={{ en: 'Booking & Reservations', sq: 'Rezervime Online' }}
      heading={{ en: 'Reservations while you sleep.', sq: 'Rezervime edhe kur fle.' }}
      subheading={{
        en: 'Missed calls and double bookings cost you tables every week — guests book straight from your site, with automatic reminders that cut no-shows. A live calendar keeps every reservation in one place, not scattered across calls and messages.',
        sq: 'Telefonatat e humbura dhe rezervimet e dyfishta të kushtojnë tavolina çdo javë — klientët rezervojnë direkt nga faqja, me kujtesa automatike që zvogëlojnë mungesat. Një kalendar live i mban të gjitha rezervimet në një vend, jo të shpërndara nëpër telefonata e mesazhe.',
      }}
      ctaLabel={{ en: 'Contact us', sq: 'Na kontaktoni' }}
      heroGraphic={<BookingHero />}
      showcaseHeading={{ en: 'Everything in one place.', sq: 'Gjithçka në një vend.' }}
      tiles={[
        {
          graphic: <TileSlots />,
          title: { en: 'Pick a time', sq: 'Zgjidh një orar' },
          subtitle: {
            en: 'Real-time availability, so guests only see open slots.',
            sq: 'Disponueshmëri në kohë reale — klientët shohin vetëm oraret e lira.',
          },
        },
        {
          graphic: <TileGuests />,
          title: { en: 'Manage guests', sq: 'Menaxho klientët' },
          subtitle: {
            en: 'See every reservation and guest detail in one dashboard.',
            sq: 'Shiko çdo rezervim dhe detaj klienti në një panel të vetëm.',
          },
        },
        {
          graphic: <TileReminder />,
          title: { en: 'Auto reminders', sq: 'Kujtesa automatike' },
          subtitle: {
            en: 'Automatic texts and emails cut down on no-shows.',
            sq: 'Mesazhe dhe email-e automatike që zvogëlojnë mungesat.',
          },
        },
      ]}
      ctaHeading={{ en: 'Fill every table.', sq: 'Mbush çdo tavolinë.' }}
      mailSubject={{ en: 'Booking system for my business', sq: 'Sistem rezervimi për biznesin tim' }}
    />
  );
}
