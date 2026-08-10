import Image from "next/image";
import type { Project } from "@/data/projects";

type CaseStudyImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function CaseStudyImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1600px) 88vw, 1400px",
}: CaseStudyImageProps) {
  return (
    <figure
      className={`case-study-visual overflow-hidden border border-line bg-[#dedbd0] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className="h-auto w-full"
      />
    </figure>
  );
}

export function Overview({ children, detail }: { children: React.ReactNode; detail?: string }) {
  return (
    <section className="case-study-overview grid gap-7 border-t border-line pt-5 lg:grid-cols-12">
      <p className="editorial-label text-muted lg:col-span-2">Overview</p>
      <div className="lg:col-span-8 lg:col-start-4">
        <h2 className="max-w-4xl text-[clamp(2rem,4vw,4.25rem)] leading-[0.96] font-medium tracking-[-0.055em] uppercase">
          {children}
        </h2>
        {detail ? <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{detail}</p> : null}
      </div>
    </section>
  );
}

export function NumberedBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-t border-line pt-5">
      <p className="editorial-label text-accent">{number}</p>
      <h2 className="mt-5 text-[clamp(1.5rem,2.5vw,2.35rem)] leading-none font-medium tracking-[-0.045em] uppercase">
        {title}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{children}</p>
    </article>
  );
}

export function ProjectIntro({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[100svh] border-b border-line">
      <div className="page-shell flex min-h-[100svh] flex-col pt-28 pb-7 sm:pt-36 sm:pb-9">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="editorial-label text-muted lg:col-span-2">{project.category}</p>
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
  );
}
