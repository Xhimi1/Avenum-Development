'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const PAY_OPTIONS = [
  { label: 'Paguaj €100', note: 'Pa suport', url: 'https://www.paypal.com/ncp/payment/PLB-WCA46ZQY6BNP' },
  { label: 'Paguaj €110', note: '+€10 suport', url: 'https://www.paypal.com/ncp/payment/PLB-VPDVC5KRG8C2' },
  { label: 'Paguaj €125', note: '+€25 suport', url: 'https://www.paypal.com/ncp/payment/PLB-ZMNAK5MCTSW5' },
  { label: 'Paguaj €130', note: '+€30 suport', url: 'https://www.paypal.com/ncp/payment/PLB-AMAPTADANVV3' },
];

export default function KroniPaymentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paid = searchParams.get('paid') === '1';
  const name = searchParams.get('name');

  const [nameInput, setNameInput] = useState('');

  const handleContinue = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    router.push(`${pathname}?name=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-[#0F0824] text-[#f2f4ff]">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-12">
        <Logo className="mb-10 text-2xl text-white" />

        <div className="w-full max-w-lg">
          {paid ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-10">
              <h1 className="font-display text-5xl font-semibold leading-tight text-white">
                Faleminderit për mbështetjen tuaj!
              </h1>
              <p className="subtext mt-4 text-sm leading-relaxed">
                Pagesa u krye me sukses dhe faqja jote është gati. Do të mbetemi në kontakt për çdo gjë tjetër që të nevojitet.
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/payment-image.webp"
                alt="Faqja e Kroni Restaurant"
                className="mt-6 w-full rounded-2xl border border-white/10 object-cover"
              />

              <Link
                href="/"
                data-cursor
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#6439FF] px-6 py-5 text-lg font-bold text-white transition-opacity duration-300 hover:opacity-90"
              >
                Kthehu në faqen kryesore
              </Link>
            </div>
          ) : !name ? (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                placeholder="Emri"
                autoFocus
                data-cursor
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 text-center text-2xl font-semibold text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleContinue}
                data-cursor
                className="w-full rounded-2xl bg-[#6439FF] px-6 py-6 text-xl font-bold text-white transition-opacity duration-300 hover:opacity-90"
              >
                Vazhdo
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="font-display text-5xl font-semibold leading-tight text-white">Welcome Mr. {name}</h1>
                <p className="subtext mt-4 text-base opacity-70 md:text-lg">
                  Çmimet më poshtë janë të siguruara nga PayPal.
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6 space-y-3">
                  {PAY_OPTIONS.map((opt, i) => (
                    <a
                      key={opt.url}
                      href={opt.url}
                      data-cursor
                      className="flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-[#6439FF] px-5 py-5 text-center text-white transition-opacity duration-300 hover:opacity-90"
                    >
                      <span className="flex items-center gap-2 text-lg font-bold">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/PayPal_Logo_Icon_2014.svg"
                          alt=""
                          className="h-5 w-5 flex-shrink-0 brightness-0 invert"
                        />
                        {opt.label}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        {i > 0 && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src="/images/emoji-smile-face.svg"
                            alt=""
                            className="h-4 w-4 flex-shrink-0"
                          />
                        )}
                        {opt.note}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="subtext text-xs">Përpunohet në mënyrë të sigurt nga</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/PayPal_Logo_Icon_2014.svg" alt="PayPal" className="h-4 w-auto" />
                </div>

                <p className="subtext mx-auto mt-4 max-w-sm text-center text-xs opacity-70">
                  Suporti juaj është ajo që na bën më të fortë. Ne do ofrojmë suport për ju 24/7 dhe do mbetemi
                  përsëri në kontakt.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
