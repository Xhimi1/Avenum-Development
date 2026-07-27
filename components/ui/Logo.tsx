'use client';

import Link from 'next/link';
import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

/** The full brand lockup (icon + wordmark) as one vector — the icon stays
 * brand-blue, the wordmark uses currentColor so it reads on both the dark
 * pages and the white service-page headers. Filter ids are namespaced per
 * instance (via useId) since this renders more than once on the same page
 * (desktop + mobile nav, footer, loader) and raw SVG ids aren't scoped. */
export function BrandLogo({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const f0 = `avnLogoIi0-${uid}`;
  const f1 = `avnLogoIi1-${uid}`;

  return (
    <svg viewBox="0 0 80 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M21.266 14L25.186 3.976H26.768L30.674 14H28.938L26.404 7.147L25.984 5.88H25.935L25.529 7.147L22.981 14H21.266ZM22.995 11.634L23.478 10.269H28.287L28.777 11.634H22.995ZM32.9801 14L30.0261 6.692H31.6991L33.5331 11.564L33.7641 12.243H33.8131L34.0581 11.557L35.8991 6.692H37.5371L34.5481 14H32.9801ZM41.6435 14.238C40.5142 14.238 39.5972 13.8763 38.8925 13.153C38.1925 12.4297 37.8425 11.494 37.8425 10.346C37.8425 9.24467 38.1855 8.323 38.8715 7.581C39.5575 6.83433 40.4605 6.461 41.5805 6.461C42.6399 6.461 43.4962 6.78533 44.1495 7.434C44.8029 8.078 45.1295 8.89 45.1295 9.87V10.71H38.6965V9.646H43.5965V9.639C43.5685 9.11167 43.3772 8.67067 43.0225 8.316C42.6679 7.96133 42.1872 7.784 41.5805 7.784C40.9412 7.784 40.4185 8.01033 40.0125 8.463C39.6065 8.91567 39.4035 9.53633 39.4035 10.325C39.4035 11.1463 39.6252 11.7833 40.0685 12.236C40.5119 12.6887 41.0742 12.915 41.7555 12.915C42.0635 12.915 42.3319 12.8777 42.5605 12.803C42.7939 12.7237 43.0085 12.614 43.2045 12.474C43.4005 12.334 43.6222 12.11 43.8695 11.802L44.9335 12.558C44.6349 13.006 44.3315 13.3397 44.0235 13.559C43.7155 13.7783 43.3749 13.9463 43.0015 14.063C42.6329 14.1797 42.1802 14.238 41.6435 14.238ZM46.6784 14V6.692H48.1974V7.994L48.0014 7.742H48.2464C48.4797 7.364 48.8181 7.056 49.2614 6.818C49.7094 6.58 50.1947 6.461 50.7174 6.461C51.5621 6.461 52.2177 6.70133 52.6844 7.182C53.1557 7.658 53.3914 8.316 53.3914 9.156V14H51.8024V9.506C51.8024 8.95533 51.6694 8.53533 51.4034 8.246C51.1374 7.95667 50.7267 7.812 50.1714 7.812C49.6254 7.812 49.1704 8.00567 48.8064 8.393C48.4471 8.77567 48.2674 9.24933 48.2674 9.814V14H46.6784ZM57.9027 14.238C57.044 14.238 56.3814 13.9953 55.9147 13.51C55.448 13.0247 55.2147 12.3363 55.2147 11.445V6.692H56.8037V11.158C56.8037 11.7507 56.939 12.1917 57.2097 12.481C57.4804 12.7703 57.8794 12.915 58.4067 12.915C58.9387 12.915 59.3844 12.7237 59.7437 12.341C60.1077 11.9537 60.2897 11.4707 60.2897 10.892V6.692H61.8787V14H60.3667V12.25L61.0947 12.978H60.3247C60.1054 13.342 59.781 13.643 59.3517 13.881C58.927 14.119 58.444 14.238 57.9027 14.238ZM63.8503 14V6.699H65.3693V7.924L65.2363 7.742H65.4183C65.6376 7.364 65.9619 7.056 66.3913 6.818C66.8206 6.58 67.2849 6.461 67.7843 6.461C68.3349 6.461 68.8086 6.58467 69.2053 6.832C69.6066 7.07467 69.8913 7.42467 70.0593 7.882C70.3206 7.42933 70.6753 7.07933 71.1233 6.832C71.5759 6.58467 72.0753 6.461 72.6213 6.461C73.4566 6.461 74.0936 6.70133 74.5323 7.182C74.9709 7.66267 75.1903 8.33467 75.1903 9.198V14H73.6153V9.513C73.6153 8.939 73.4869 8.512 73.2303 8.232C72.9783 7.952 72.5979 7.812 72.0893 7.812C71.5946 7.812 71.1746 8.00333 70.8293 8.386C70.4886 8.76867 70.3183 9.25167 70.3183 9.835V14H68.7293V9.513C68.7293 8.93433 68.5986 8.50733 68.3373 8.232C68.0806 7.952 67.7049 7.812 67.2103 7.812C66.7156 7.812 66.2956 8.008 65.9503 8.4C65.6096 8.792 65.4393 9.26567 65.4393 9.821V14H63.8503Z"
      />
      <g filter={`url(#${f0})`}>
        <path d="M10.28182 3.825H14.22269V4.25L18.16363 3.825V9.23409C18.16363 11.41057 16.3992 13.175 14.22269 13.175C12.04627 13.175 10.28182 11.41057 10.28182 9.23409V3.825Z" fill="#6367FF" />
      </g>
      <g filter={`url(#${f1})`}>
        <path d="M0 13.175H3.94091V12.75L7.88182 13.175V7.76591C7.88182 5.5894 6.11742 3.825 3.94091 3.825C1.7644 3.825 0 5.5894 0 7.76591V13.175Z" fill="#6367FF" />
      </g>
      <defs>
        <filter id={f0} x="10.28182" y="3.825" width="8.30682" height="9.775" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.2125" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="0.425" dy="0.425" />
          <feGaussianBlur stdDeviation="0.2125" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow" />
        </filter>
        <filter id={f1} x="0" y="3.825" width="8.30682" height="9.775" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.2125" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="0.425" dy="0.425" />
          <feGaussianBlur stdDeviation="0.2125" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
}

/** The brand lockup, used identically across the homepage nav and every standalone page header. */
export default function Logo({ href = '/', onClick, className }: LogoProps) {
  const content = <BrandLogo className="h-[1.1em] w-auto" />;

  const classes = cn('inline-flex items-center text-current', className);

  if (onClick) {
    return (
      <button
        type="button"
        data-cursor
        onClick={onClick}
        aria-label="Avenum — back to top"
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} data-cursor aria-label="Avenum — home" className={classes}>
      {content}
    </Link>
  );
}
