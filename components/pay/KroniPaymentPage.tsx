'use client';

import { useSearchParams } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import ArrowRight from '@/components/ui/ArrowRight';

const PAY_OPTIONS = [
  { label: 'Paguaj €100', note: 'Pa bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-WCA46ZQY6BNP' },
  { label: 'Paguaj €110', note: '+€10 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-VPDVC5KRG8C2' },
  { label: 'Paguaj €125', note: '+€25 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-ZMNAK5MCTSW5' },
  { label: 'Paguaj €130', note: '+€30 bakshësh', url: 'https://www.paypal.com/ncp/payment/PLB-AMAPTADANVV3' },
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
              <h1 className="font-display text-5xl font-semibold leading-tight text-white">Faleminderit!</h1>
              <p className="subtext mt-4 text-sm leading-relaxed">
                Pagesa u krye me sukses. Do të jemi në kontakt shpejt për të filluar punën për faqen tënde.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="font-display text-5xl font-semibold leading-tight text-white">Mirë se vjen, Kroni.</h1>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-white">Detajet e pagesës</h2>

                <div className="mt-6 space-y-3">
                  {PAY_OPTIONS.map((opt) => (
                    <a
                      key={opt.url}
                      href={opt.url}
                      data-cursor
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white px-5 py-4 text-black transition-opacity duration-300 hover:opacity-90"
                    >
                      <span className="flex flex-col leading-tight">
                        <span className="text-lg font-semibold">{opt.label}</span>
                        <span className="mt-1 flex items-center gap-1.5 text-xs text-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/emoji-face-straight-satisfactory-svgrepo-com.svg"
                            alt=""
                            className="h-4 w-4 flex-shrink-0"
                          />
                          {opt.note}
                        </span>
                      </span>
                      <ArrowRight className="h-6 w-6 flex-shrink-0" />
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="subtext text-xs">Përpunohet në mënyrë të sigurt nga</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/PayPal_Logo_Icon_2014.svg" alt="PayPal" className="h-4 w-auto" />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
