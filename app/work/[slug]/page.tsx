import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
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

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return (
    <main>
      <section className="relative min-h-[100svh] border-b border-line">
        <Header detailPage />
        <div className="page-shell flex min-h-[100svh] flex-col pt-28 pb-7 sm:pt-36 sm:pb-9">
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="editorial-label text-muted lg:col-span-2">
              {project.category}
            </p>
            <div className="lg:col-span-9 lg:col-start-4">
              <h1 className="text-[clamp(4.25rem,12.5vw,12.5rem)] leading-[0.78] font-medium tracking-[-0.075em] uppercase">
                {project.title}
              </h1>
              <p className="mt-8 max-w-xl text-[clamp(1.3rem,2.2vw,2rem)] leading-tight tracking-[-0.03em] text-muted sm:mt-12">
                {project.description}
              </p>
            </div>
          </div>

          <dl className="mt-auto grid gap-8 border-t border-line pt-5 text-sm sm:grid-cols-3 lg:ml-[25%]">
            <div>
              <dt className="editorial-label text-muted">Role</dt>
              <dd className="mt-3">{project.role}</dd>
            </div>
            <div>
              <dt className="editorial-label text-muted">Year</dt>
              <dd className="mt-3">{project.year}</dd>
            </div>
            <div>
              <dt className="editorial-label text-muted">Stack</dt>
              <dd className="mt-3">{project.technologies.join(" / ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="page-shell py-[var(--section-space)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#dedbd0]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="(max-width: 1600px) 94vw, 1480px"
            className="object-cover"
          />
        </div>

        <div className="mt-[clamp(5rem,10vw,10rem)] grid gap-16 lg:grid-cols-12 lg:gap-6">
          {[
            ["Overview", project.overview],
            ["Challenge", project.challenge],
            ["Solution", project.solution],
          ].map(([label, copy], index) => (
            <article
              key={label}
              className={
                index === 0
                  ? "lg:col-span-6 lg:col-start-4"
                  : "border-t border-line pt-5 lg:col-span-4"
              }
            >
              <h2 className="editorial-label text-muted">{label}</h2>
              <p className="mt-6 text-[clamp(1.3rem,2.25vw,2.15rem)] leading-[1.25] tracking-[-0.035em]">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>

      <section className="bg-dark text-canvas">
        <div className="page-shell py-[clamp(5rem,10vw,9rem)]">
          <p className="editorial-label text-dark-muted">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-10 flex items-end justify-between border-b border-canvas/30 pb-5"
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
            <p>© 2026 Hamza Outmassint</p>
          </div>
        </div>
      </section>
    </main>
  );
}
