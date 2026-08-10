"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type QuickTo = ReturnType<typeof gsap.quickTo>;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const projectRowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const xTo = useRef<QuickTo | null>(null);
  const yTo = useRef<QuickTo | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [visibleProjectIndexes, setVisibleProjectIndexes] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    const compactViewportQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsCompactViewport(compactViewportQuery.matches);

    updateViewport();
    compactViewportQuery.addEventListener("change", updateViewport);

    return () => compactViewportQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isCompactViewport) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = window.requestAnimationFrame(() => {
        setVisibleProjectIndexes(new Set(projects.map((_, index) => index)));
      });

      return () => window.cancelAnimationFrame(fallbackFrame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextIndexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLElement).dataset.projectIndex));

        if (!nextIndexes.length) return;

        setVisibleProjectIndexes((visibleIndexes) => {
          const nextVisibleIndexes = new Set(visibleIndexes);
          let changed = false;

          nextIndexes.forEach((index) => {
            if (nextVisibleIndexes.has(index)) return;
            nextVisibleIndexes.add(index);
            changed = true;
          });

          return changed ? nextVisibleIndexes : visibleIndexes;
        });

        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => observer.unobserve(entry.target));
      },
      { threshold: 0.01 },
    );

    projectRowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, [isCompactViewport]);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (previewRef.current) {
        gsap.set(previewRef.current, { autoAlpha: 0, scale: 0.94 });
        xTo.current = gsap.quickTo(previewRef.current, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        yTo.current = gsap.quickTo(previewRef.current, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
      }

      if (!reducedMotion) {
        gsap.from(".project-row", {
          y: 36,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-list",
            start: "top 78%",
            once: true,
          },
        });
      }

      return () => {
        if (previewRef.current) {
          gsap.killTweensOf(previewRef.current);
        }
      };
    },
    { scope: sectionRef },
  );

  const canPreview = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const movePreview = (event: React.PointerEvent, immediate = false) => {
    if (!canPreview()) return;

    const preview = previewRef.current;
    if (!preview) return;

    const width = Math.min(390, window.innerWidth * 0.29);
    const height = width * 0.66;
    const gutter = 18;
    const x = gsap.utils.clamp(
      gutter,
      window.innerWidth - width - gutter,
      event.clientX + 28,
    );
    const y = gsap.utils.clamp(
      gutter,
      window.innerHeight - height - gutter,
      event.clientY - height / 2,
    );

    if (immediate || !xTo.current || !yTo.current) {
      gsap.set(preview, { x, y });
      return;
    }

    xTo.current(x);
    yTo.current(y);
  };

  const showPreview = (
    index: number,
    event: React.PointerEvent<HTMLAnchorElement>,
  ) => {
    if (!canPreview()) return;
    setActiveIndex(index);
    movePreview(event, true);
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const hidePreview = () => {
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.94,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="page-shell py-[var(--section-space-compact)]"
      aria-labelledby="work-title"
    >
      <div className="mb-12 flex items-end justify-between sm:mb-20">
        <h2 id="work-title" className="editorial-label text-muted">
          Selected work
        </h2>
        <p className="editorial-label" aria-label={`${projects.length} projects`}>
          01—0{projects.length}
        </p>
      </div>

      <div className="projects-list border-t border-line">
        {projects.map((project, index) => {
          const shouldLoadMobileImage =
            isCompactViewport && visibleProjectIndexes.has(index);

          return (
            <Link
            key={project.slug}
            ref={(element) => {
              projectRowRefs.current[index] = element;
            }}
            data-project-index={index}
            href={`/work/${project.slug}`}
            className="project-row group block border-b border-line py-6 transition-colors duration-300 hover:border-ink sm:py-8 md:py-0"
            onPointerEnter={(event) => showPreview(index, event)}
            onPointerMove={movePreview}
            onPointerLeave={hidePreview}
            aria-label={`View ${project.title}: ${project.description}`}
            data-cursor="label"
            data-cursor-label="View"
            >
            <div className="grid items-center gap-x-6 md:min-h-40 md:grid-cols-[4rem_minmax(0,1fr)_13rem_4rem] lg:min-h-44 lg:grid-cols-[6rem_minmax(0,1fr)_16rem_5rem]">
              <span className="mb-5 text-xs font-semibold tracking-[0.08em] text-muted md:mb-0">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-[clamp(2.7rem,6.7vw,7rem)] leading-[0.86] font-medium tracking-[-0.06em] uppercase transition-transform duration-500 ease-out group-hover:translate-x-2">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-muted md:hidden">
                  {project.description}
                </p>
              </div>
              <div className="mt-7 flex items-end justify-between md:mt-0 md:block">
                <div>
                  <p className="hidden text-sm md:block">{project.description}</p>
                  <p className="mt-1.5 text-xs text-muted">{project.category}</p>
                </div>
                <span className="text-xs font-medium md:mt-3 md:block">
                  {project.year}
                </span>
              </div>
              <span
                className="hidden justify-self-end text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-[#dedbd0] md:hidden">
              {shouldLoadMobileImage && (
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), 1px"
                  className="object-cover"
                />
              )}
            </div>
            </Link>
          );
        })}
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden aspect-[3/2] w-[min(29vw,390px)] overflow-hidden bg-[#dedbd0] shadow-[0_24px_65px_rgba(23,23,20,0.18)] md:block"
        aria-hidden="true"
      >
        {activeIndex !== null && (
          <Image
            key={projects[activeIndex].image}
            src={projects[activeIndex].image}
            alt=""
            fill
            loading="eager"
            unoptimized
            sizes="(max-width: 1279px) 29vw, 390px"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
