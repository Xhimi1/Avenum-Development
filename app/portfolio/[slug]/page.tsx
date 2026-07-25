import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyPage from '@/components/portfolio/CaseStudyPage';
import { PROJECTS } from '@/lib/projects';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Avenum`,
    description: project.description?.en ?? `A project built by Avenum for ${project.name}.`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
