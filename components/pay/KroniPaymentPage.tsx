'use client';

import { useSearchParams } from 'next/navigation';
import { useT, type Bi } from '@/lib/i18n';
import Logo from '@/components/ui/Logo';
import ArrowRight from '@/components/ui/ArrowRight';

const PAYMENT_LINK = 'https://www.paypal.com/ncp/payment/PLB-AZ9HNERNWM7U';

const EYEBROW: Bi = { en: 'Payment', sq: 'Pagesë' };
const WELCOME_TITLE: Bi = { en: 'Welcome, Kroni.', sq: 'Mirë se vjen, Kroni.' };
const WELCOME_BODY: Bi = {
  en: "This is your private payment page for the web development work we agreed on. Nothing here is linked from the rest of the site — this link is just for you.",
  sq: 'Kjo është faqja jote private e pagesës për punën e zhvillimit web që ramë dakord. Asgjë këtu nuk lidhet me pjesën tjetër të faqes — ky link është vetëm për ty.',
};

const DESCRIPTION_TITLE: Bi = { en: 'Payment details', sq: 'Detajet e pagesës' };
const DESCRIPTION_BODY: Bi = {
  en: 'One-time payment for web development services provided by Avenum.',
  sq: 'Pagesë një-herëshe për shërbimin e zhvillimit web nga Avenum.',
};
const PAY_LABEL: Bi = { en: 'Pay €100 securely', sq: 'Paguaj €100 në mënyrë të sigurt' };
const PAY_NOTE: Bi = { en: 'Handled securely by PayPal.', sq: 'Përpunohet në mënyrë të sigurt nga PayPal.' };

const THANKS_TITLE: Bi = { en: 'Thank you!', sq: 'Faleminderit!' };
const THANKS_BODY: Bi = {
  en: "Your payment went through. We'll be in touch shortly to get started on your website.",
  sq: 'Pagesa u krye me sukses. Do të jemi në kontakt shpejt për të filluar punën për faqen tënde.',
};

export default function KroniPaymentPage() {
  const t = useT();
  const searchParams = useSearchParams();
  const paid = searchParams.get('paid') === '1';

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-[#0F0824] text-[#f2f4ff]">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-12">
        <Logo className="mb-10 text-2xl text-white" />

        <div className="w-full max-w-md">
          {paid ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-10">
              <span
                className="mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                style={{ backgroundColor: 'color-mix(in srgb, #6439FF 20%, transparent)', color: '#a78bfa' }}
              >
                {t(EYEBROW)}
              </span>
              <h1 className="font-display text-3xl font-semibold leading-tight text-white">{t(THANKS_TITLE)}</h1>
              <p className="subtext mt-4 text-sm leading-relaxed">{t(THANKS_BODY)}</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <span
                  className="mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                  style={{ backgroundColor: 'color-mix(in srgb, #6439FF 20%, transparent)', color: '#a78bfa' }}
                >
                  {t(EYEBROW)}
                </span>
                <h1 className="font-display text-3xl font-semibold leading-tight text-white">{t(WELCOME_TITLE)}</h1>
                <p className="subtext mt-4 text-sm leading-relaxed">{t(WELCOME_BODY)}</p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-white">{t(DESCRIPTION_TITLE)}</h2>
                <p className="subtext mt-2 text-sm leading-relaxed">{t(DESCRIPTION_BODY)}</p>

                <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-6">
                  <span className="text-sm text-white/60">{t({ en: 'Total due', sq: 'Totali për pagesë' })}</span>
                  <span className="font-display text-3xl font-semibold text-white">€100</span>
                </div>

                <a
                  href={PAYMENT_LINK}
                  data-cursor
                  className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-medium tracking-normal text-black transition-opacity duration-300 hover:opacity-90"
                >
                  {t(PAY_LABEL)}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="subtext mt-3 text-center text-xs">{t(PAY_NOTE)}</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
