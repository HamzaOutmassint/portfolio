import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { GalerieDesTanneursCaseStudy } from "@/components/work/GalerieDesTanneursCaseStudy";
import { ProjectIntro } from "@/components/work/CaseStudyPrimitives";
import { RemediaCaseStudy } from "@/components/work/RemediaCaseStudy";
import { VoyspireCaseStudy } from "@/components/work/VoyspireCaseStudy";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { getNextProject, getProject, projects } from "@/data/projects";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

function CaseStudyContent({ slug }: { slug: string }) {
  if (slug === "remedia") return <RemediaCaseStudy />;
  if (slug === "voyspire") return <VoyspireCaseStudy />;
  if (slug === "galerie-des-tanneurs") return <GalerieDesTanneursCaseStudy />;

  return null;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return (
    <main>
      <Header detailPage />
      <ProjectIntro project={project} />
      <CaseStudyContent slug={slug} />

      <section className="bg-dark text-canvas" data-cursor-tone="light">
        <div className="page-shell py-[clamp(5rem,10vw,9rem)]">
          <p className="editorial-label text-dark-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-10 flex items-end justify-between border-b border-canvas/30 pb-5"
            data-cursor="label"
            data-cursor-label="View"
          >
            <span className="text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-medium tracking-[-0.065em] uppercase transition-transform duration-500 group-hover:translate-x-2">
              {nextProject.title}
            </span>
            <span
              className="mb-1 text-3xl text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:text-5xl"
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
          <div className="mt-12 flex justify-between text-xs text-dark-muted">
            <Link href="/#work" className="link-line">
              All work
            </Link>
            <p>
              © <CurrentYear initialYear={new Date().getFullYear()} /> Hamza Outmassint
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
