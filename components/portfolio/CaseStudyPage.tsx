'use client';

import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import ArrowRight from '@/components/ui/ArrowRight';
import OtherWork from './OtherWork';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import { whatsappHref, WA_MESSAGE } from '@/lib/contact';

const OVERVIEW_HEADING: Bi = { en: 'Project overview', sq: 'Përmbledhje e projektit' };
const APPROACH_HEADING: Bi = { en: 'Our approach', sq: 'Qasja jonë' };
const IMAGE_PLACEHOLDER: Bi = { en: 'Image', sq: 'Imazh' };
const CTA_HEADING: Bi = { en: 'We can build something like this for you.', sq: 'Mund të ndërtojmë diçka të tillë edhe për ty.' };
const CTA_BODY: Bi = {
  en: "Tell us about your business — we'll get back to you fast.",
  sq: 'Na trego për biznesin tënd — do të të përgjigjemi shpejt.',
};
const CTA_LABEL: Bi = { en: 'Contact us', sq: 'Na kontaktoni' };

/** "https://kroni-restaurant.com/" -> "kroni-restaurant.com" for display in the live-site button */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Minimalist, white-background case-study template for a single portfolio
 * project — deliberately plainer than the rest of the site (no eyebrow
 * pills, no uppercase/tracking-wide labels): one hero image, the project
 * name, a description line, service pills, then a two-image overview
 * and an "our approach" write-up. Sections tied to optional project data
 * (description/services/approach) are simply omitted when absent; the two
 * overview images fall back to placeholder boxes until real mockups exist.
 */
export default function CaseStudyPage({ project }: { project: Project }) {
  const t = useT();
  const services = project.services ?? [];
  const waLink = whatsappHref(WA_MESSAGE);

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main className="px-4 pt-24 md:px-8 md:pt-28">
        {/* hero — one image, then name / description / service pills below it */}
        <section className="mx-auto w-full max-w-5xl">
          <FadeIn>
            {/* fixed desktop-viewport aspect ratio, same size for every project */}
            {project.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.heroImage}
                alt=""
                className="aspect-video w-full rounded-xl border-[6px] border-[#E4E4E7] object-cover object-top md:rounded-3xl md:border-[12px]"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-white/15 bg-black/[0.02] text-sm text-white/30">
                {t(IMAGE_PLACEHOLDER)}
              </div>
            )}
          </FadeIn>

          <div className="mt-8 md:mt-10">
            <FadeIn>
              <span className="inline-block w-fit rounded-full bg-white/10 px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
                {t(project.category)}
              </span>
            </FadeIn>
            <h1 className="heading-hero mt-6 [text-wrap:balance]">
              {project.name}
              {project.isPrototype && (
                <span className="ml-1 align-middle text-base font-normal opacity-30 md:text-lg"> (Prototype)</span>
              )}
            </h1>

            {project.description && (
              <FadeIn delay={0.2}>
                <p className="subheading-hero mt-2 max-w-2xl md:mt-3">
                  {t(project.description)}
                </p>
              </FadeIn>
            )}

            {project.liveUrl && (
              <FadeIn delay={0.25} className="mt-5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  {displayUrl(project.liveUrl)}
                  <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </FadeIn>
            )}

            {services.length > 0 && (
              <FadeIn delay={0.3} className="mt-8 flex flex-wrap gap-2">
                {services.map((svc, i) => (
                  <span
                    key={i}
                    className="inline-block w-fit rounded-full bg-white/10 px-3 py-1 text-[0.8rem] font-medium text-[#003049]"
                  >
                    {t(svc)}
                  </span>
                ))}
              </FadeIn>
            )}
          </div>
        </section>

        {/* project overview — two mockups, side by side on desktop, stacked on mobile */}
        <section className="mx-auto mt-20 w-full max-w-5xl md:mt-28">
          <h2 className="heading-lg">{t(OVERVIEW_HEADING)}</h2>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:gap-8">
            {/* first mockup — plain placeholder */}
            <FadeIn className="flex-1">
              {project.overviewImages?.[0] ? (
                <div
                  className="aspect-[4/3] w-full overflow-hidden rounded-lg"
                  style={{
                    background:
                      project.overviewBg ?? project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.overviewImages[0]}
                    alt=""
                    className={`h-full w-full ${project.overviewImageFit === 'cover' ? 'object-cover' : 'object-contain object-bottom'}`}
                    style={{ transform: `scale(${project.overviewImageScale ?? 1.7})` }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border-2 border-dashed border-white/15 bg-black/[0.02] text-sm text-white/30">
                  {t(IMAGE_PLACEHOLDER)}
                </div>
              )}
            </FadeIn>

            {/* second mockup — colored panel with space at the top/left, the
                mockup itself anchored to the bottom-right corner */}
            <FadeIn delay={0.1} className="flex-1">
              {project.overviewImages?.[1] ? (
                <div
                  className="aspect-[4/3] w-full overflow-hidden rounded-lg pl-10 pt-10 md:pl-14 md:pt-14"
                  style={{
                    background:
                      project.overviewBg ?? project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.overviewImages[1]}
                    alt=""
                    className="h-full w-full rounded-tl-lg object-cover object-left-top"
                  />
                </div>
              ) : (
                <div
                  className="aspect-[4/3] w-full rounded-lg pl-10 pt-10 md:pl-14 md:pt-14"
                  style={{
                    background:
                      project.overviewBg ?? project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-tl-lg border-2 border-dashed border-white/40 text-sm text-white/70">
                    {t(IMAGE_PLACEHOLDER)}
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* our approach */}
        {project.approach && (
          <section className="mx-auto mt-20 w-full max-w-5xl md:mt-28">
            <h2 className="heading-lg">{t(APPROACH_HEADING)}</h2>
            <FadeIn delay={0.1}>
              <p className="subtext mt-5 max-w-2xl">
                {t(project.approach)}
              </p>
            </FadeIn>
          </section>
        )}

        <OtherWork currentSlug={project.slug} />

        {/* closing CTA — identical to the homepage's Contact banner */}
        <section className="relative -mx-4 min-h-[65vh] md:-mx-8 md:min-h-[80vh]">
          <div className="flex min-h-[65vh] p-3 md:min-h-[80vh] md:p-6">
            <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white/[0.04] px-6 py-16 text-center md:max-w-6xl md:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                  maskImage: 'linear-gradient(to top, black, rgba(0,0,0,0.15))',
                  WebkitMaskImage: 'linear-gradient(to top, black, rgba(0,0,0,0.15))',
                }}
              />

              <div className="relative">
                <SplitText
                  as="h2"
                  className="heading-lg"
                >
                  {t(CTA_HEADING)}
                </SplitText>

                <FadeIn delay={0.15}>
                  <p className="subtext mx-auto mt-5 max-w-xl">{t(CTA_BODY)}</p>
                </FadeIn>

                <FadeIn delay={0.3} className="mt-12 flex justify-center">
                  <a
                    href={waLink}
                    data-cursor
                    className="pointer-events-auto btn-primary"
                  >
                    {t(CTA_LABEL)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer theme="light" />
    </div>
  );
}
