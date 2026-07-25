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

const OVERVIEW_HEADING: Bi = { en: 'Project overview', sq: 'Përmbledhje e projektit' };
const APPROACH_HEADING: Bi = { en: 'Our approach', sq: 'Qasja jonë' };
const IMAGE_PLACEHOLDER: Bi = { en: 'Image', sq: 'Imazh' };
const LIVE_WEBSITE: Bi = { en: 'Live website', sq: 'Faqja live' };

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

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <main className="px-4 pb-24 pt-24 md:px-8 md:pb-32 md:pt-28">
        {/* hero — one image, then name / description / service pills below it */}
        <section className="mx-auto w-full max-w-5xl">
          <FadeIn>
            {/* fixed desktop-viewport aspect ratio, same size for every project */}
            {project.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.heroImage}
                alt=""
                className="aspect-video w-full rounded-xl border-[6px] border-[#E4E4E7] object-cover md:rounded-3xl md:border-[12px]"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-black/15 bg-black/[0.02] text-sm text-black/30">
                {t(IMAGE_PLACEHOLDER)}
              </div>
            )}
          </FadeIn>

          <div className="mt-8 md:mt-10">
            <FadeIn>
              <span className="inline-block w-fit rounded-full bg-[#EEF0FF] px-3 py-1 text-[0.8rem] font-medium text-[#6367FF]">
                {t(project.category)}
              </span>
            </FadeIn>
            <SplitText
              as="h1"
              delay={0.1}
              className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-normal [text-wrap:balance] md:text-[clamp(1.5rem,3.4vw,2.4rem)]"
            >
              {project.name}
            </SplitText>

            {project.description && (
              <FadeIn delay={0.2}>
                <p className="mt-3 max-w-2xl text-sm text-black md:text-base">
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
                  className="group inline-flex items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  {t(LIVE_WEBSITE)}
                  <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </FadeIn>
            )}

            {services.length > 0 && (
              <FadeIn delay={0.3} className="mt-8 flex flex-wrap gap-2">
                {services.map((svc, i) => (
                  <span
                    key={i}
                    className="inline-block w-fit rounded-full bg-[#00304914] px-3 py-1 text-[0.8rem] font-medium text-[#003049]"
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
          <h2 className="font-display text-3xl font-medium md:text-4xl">{t(OVERVIEW_HEADING)}</h2>
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
                    className={`h-full w-full ${project.overviewImageFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                    style={{ transform: `scale(${project.overviewImageScale ?? 1.7})` }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border-2 border-dashed border-black/15 bg-black/[0.02] text-sm text-black/30">
                  {t(IMAGE_PLACEHOLDER)}
                </div>
              )}
            </FadeIn>

            {/* second mockup — colored panel with space at the top/left, the
                mockup itself anchored to the bottom-right corner */}
            <FadeIn delay={0.1} className="flex-1">
              {project.overviewImages?.[1] ? (
                <div
                  className="aspect-[4/3] w-full overflow-hidden rounded-lg"
                  style={{
                    background:
                      project.overviewBg ?? project.canvasColor ?? 'linear-gradient(180deg, #D2EBFB 0%, #F3FAFF 100%)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.overviewImages[1]}
                    alt=""
                    className={`h-full w-full ${project.overviewImageFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                    style={{ transform: `scale(${project.overviewImageScale ?? 1.7})` }}
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
            <h2 className="font-display text-3xl font-medium md:text-4xl">{t(APPROACH_HEADING)}</h2>
            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black md:text-base">
                {t(project.approach)}
              </p>
            </FadeIn>
          </section>
        )}

        <OtherWork currentSlug={project.slug} />
      </main>

      <Footer theme="light" />
    </div>
  );
}
