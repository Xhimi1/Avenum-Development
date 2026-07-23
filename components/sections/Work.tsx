'use client';

import ArrowRight from '@/components/ui/ArrowRight';
import FadeIn from '@/components/ui/FadeIn';
import SplitText from '@/components/ui/SplitText';
import { PROJECTS } from '@/lib/projects';
import { useT } from '@/lib/i18n';
import type { Bi } from '@/lib/i18n';

const HEADING: Bi = {
  en: 'Work that speaks for itself.',
  sq: 'Punë që flet vetë.',
};
const SUBHEADING: Bi = {
  en: 'A handful of recent projects — each one designed, built and shipped to make an impression.',
  sq: 'Disa nga projektet e fundit — secili i dizajnuar, ndërtuar dhe lançuar për të lënë përshtypje.',
};
const CASE_STUDY_LABEL: Bi = { en: 'See case study', sq: 'Shiko studimin e rastit' };

export default function Work() {
  const t = useT();

  return (
    <section id="work" data-scene-section className="relative bg-white py-24 text-black md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="max-w-2xl">
          <SplitText
            as="h2"
            className="font-display text-[clamp(2.1rem,5.5vw,4.6rem)] font-semibold leading-[0.95]"
          >
            {t(HEADING)}
          </SplitText>
          <FadeIn delay={0.15}>
            <p className="mt-4 max-w-xl text-sm text-black md:text-base">{t(SUBHEADING)}</p>
          </FadeIn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {PROJECTS.map((project, i) => (
            <li key={project.name}>
              <FadeIn delay={0.1 * i}>
                <div aria-hidden className="aspect-[4/3] w-full rounded-2xl bg-black/10" />
                <h3 className="mt-5 font-display text-2xl font-semibold md:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-black md:text-base">{project.tagline}</p>
                <button
                  type="button"
                  data-cursor
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-black to-neutral-800 px-9 py-4 text-sm font-medium text-white transition-colors duration-300 hover:to-neutral-700"
                >
                  {t(CASE_STUDY_LABEL)}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
