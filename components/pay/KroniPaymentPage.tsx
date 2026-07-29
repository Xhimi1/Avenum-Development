'use client';

import { useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import ArrowRight from '@/components/ui/ArrowRight';

const PAY_OPTIONS = [
  { label: 'Paguaj €100', note: 'Pa bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-WCA46ZQY6BNP' },
  { label: 'Paguaj €110', note: '+€10 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-VPDVC5KRG8C2' },
  { label: 'Paguaj €125', note: '+€25 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-ZMNAK5MCTSW5' },
  { label: 'Paguaj €150', note: '+€50 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-R39MGQ4QXUG2' },
];

export default function KroniPaymentPage() {
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
                Pagesë
              </span>
              <h1 className="font-display text-3xl font-semibold leading-tight text-white">Faleminderit!</h1>
              <p className="subtext mt-4 text-sm leading-relaxed">
                Pagesa u krye me sukses. Do të jemi në kontakt shpejt për të filluar punën për faqen tënde.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <span
                  className="mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
                  style={{ backgroundColor: 'color-mix(in srgb, #6439FF 20%, transparent)', color: '#a78bfa' }}
                >
                  Pagesë
                </span>
                <h1 className="font-display text-3xl font-semibold leading-tight text-white">Mirë se vjen, Kroni.</h1>
                <p className="subtext mt-4 text-sm leading-relaxed">
                  Kjo është faqja jote private e pagesës për punën e zhvillimit web që ramë dakord. Asgjë këtu nuk
                  lidhet me pjesën tjetër të faqes — ky link është vetëm për ty.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-white">Detajet e pagesës</h2>
                <p className="subtext mt-2 text-sm leading-relaxed">
                  Pagesë një-herëshe për shërbimin e zhvillimit web nga Avenum. Shuma bazë është €100 — nëse dëshiron,
                  mund të shtosh edhe një bakshish më poshtë.
                </p>

                <div className="mt-6 space-y-3">
                  {PAY_OPTIONS.map((opt) => (
                    <a
                      key={opt.url}
                      href={opt.url}
                      data-cursor
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white px-5 py-3.5 text-black transition-opacity duration-300 hover:opacity-90"
                    >
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold">{opt.label}</span>
                        <span className="text-xs text-black/50">{opt.note}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </a>
                  ))}
                </div>
                <p className="subtext mt-4 text-center text-xs">Përpunohet në mënyrë të sigurt nga PayPal.</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
