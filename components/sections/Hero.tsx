"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { LocalTime } from "@/components/ui/LocalTime";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const secondLineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const hero = heroRef.current;
      const firstLine = firstLineRef.current;
      const secondLine = secondLineRef.current;

      if (!hero || !firstLine || !secondLine || !contextSafe) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const createScrollAnimation = contextSafe(() => {
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        scrollTimeline
          .to(firstLine, { xPercent: 3, ease: "none" }, 0)
          .to(secondLine, { xPercent: -3, ease: "none" }, 0);
      });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: createScrollAnimation,
      });

      intro
        .fromTo(
          firstLine,
          { xPercent: -105, autoAlpha: 1 },
          { xPercent: 0, autoAlpha: 1, duration: 1.05 },
        )
        .fromTo(
          secondLine,
          { xPercent: 105, autoAlpha: 1 },
          { xPercent: 0, autoAlpha: 1, duration: 1.05 },
          0.08,
        )
        .fromTo(
          ".hero-reveal",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          0.52,
        )
        .set([firstLine, secondLine], { xPercent: 0, autoAlpha: 1 });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-line"
      aria-labelledby="hero-title"
    >
      <Header />
      <div className="page-shell grid flex-1 grid-rows-[auto_minmax(0,1fr)] pt-24 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 pt-[clamp(4rem,12svh,7rem)] sm:grid-cols-12 sm:pt-[clamp(5rem,14svh,8rem)]">
          <p className="hero-reveal col-span-1 text-[0.68rem] leading-[1.35] font-medium tracking-[0.08em] uppercase sm:col-span-3 sm:text-xs">
            Full-stack developer
            <br />
            building useful digital products.
          </p>
          <p className="hero-reveal col-start-2 flex w-fit self-start flex-col items-start justify-self-start text-[0.68rem] leading-[1.3] font-medium tracking-[0.08em] uppercase sm:col-span-3 sm:col-start-10 sm:justify-self-end sm:text-xs">
            <span className="flex items-center gap-2 text-muted">
              <span
                className="availability-dot size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              Available for
            </span>
            <span className="mt-0.5 font-semibold text-ink">
              Interesting work
            </span>
          </p>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col justify-center pt-[clamp(3rem,10svh,7rem)]">
          <h1
            id="hero-title"
            className="mb-[clamp(1.75rem,4vw,3.75rem)] shrink-0 font-semibold tracking-[-0.075em] uppercase"
          >
            <span className="block overflow-hidden leading-[0.77]">
              <span
                ref={firstLineRef}
                className="hero-line-first block text-[clamp(4.7rem,15.1vw,16.5rem)]"
              >
                Hamza
              </span>
            </span>
            <span className="block overflow-hidden leading-[0.77] text-right">
              <span
                ref={secondLineRef}
                className="hero-line-second block text-[clamp(3.55rem,13.2vw,14.25rem)]"
              >
                Outmassint
              </span>
            </span>
          </h1>

          <div className="hero-reveal grid shrink-0 grid-cols-[3fr_2fr] items-end border-t border-line pt-4 text-[0.66rem] font-medium tracking-[0.08em] uppercase sm:grid-cols-12 sm:text-xs">
            <p className="whitespace-nowrap sm:col-span-3">
              <span className="sm:hidden">Marrakech</span>
              <span className="hidden sm:inline">{siteConfig.location}</span>
              <span className="ml-3 text-muted"><LocalTime /></span>
            </p>
            <a
              href="#work"
              className="group justify-self-end sm:col-span-3 sm:col-start-10"
            >
              Selected work
              <span
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
