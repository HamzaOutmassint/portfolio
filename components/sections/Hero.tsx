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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          ".hero-line-first",
          { xPercent: -105 },
          { xPercent: 0, duration: 1.05 },
        )
        .fromTo(
          ".hero-line-second",
          { xPercent: 105 },
          { xPercent: 0, duration: 1.05 },
          0.08,
        )
        .fromTo(
          ".hero-reveal",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          0.52,
        );

      gsap.to(".hero-line-first", {
        xPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      gsap.to(".hero-line-second", {
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
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
      <div className="page-shell flex flex-1 flex-col justify-end pt-24 pb-6 sm:pb-8">
        <div className="mb-auto grid grid-cols-2 pt-[12vh] sm:grid-cols-12 sm:pt-[14vh]">
          <p className="hero-reveal col-span-1 text-[0.68rem] leading-[1.35] font-medium tracking-[0.08em] uppercase sm:col-span-3 sm:text-xs">
            Full-stack developer
            <br />
            building useful digital products.
          </p>
          <p className="hero-reveal col-start-2 text-right text-[0.68rem] leading-[1.35] text-muted sm:col-span-3 sm:col-start-10 sm:text-xs">
            Available for
            <br />
            interesting work
          </p>
        </div>

        <h1
          id="hero-title"
          className="mb-[clamp(1.75rem,4vw,3.75rem)] font-semibold tracking-[-0.075em] uppercase"
        >
          <span className="block overflow-hidden leading-[0.77]">
            <span className="hero-line-first block text-[clamp(4.7rem,15.1vw,15rem)]">
              Hamza
            </span>
          </span>
          <span className="block overflow-hidden leading-[0.77] text-right">
            <span className="hero-line-second block text-[clamp(3.55rem,13.2vw,13rem)]">
              Outmassint
            </span>
          </span>
        </h1>

        <div className="hero-reveal grid grid-cols-[3fr_2fr] items-end border-t border-line pt-4 text-[0.66rem] font-medium tracking-[0.08em] uppercase sm:grid-cols-12 sm:text-xs">
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
    </section>
  );
}
