"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, socialLinks } from "@/lib/site-config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type QuickTo = ReturnType<typeof gsap.quickTo>;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const xTo = useRef<QuickTo | null>(null);
  const yTo = useRef<QuickTo | null>(null);

  useGSAP(
    () => {
      if (ctaRef.current) {
        xTo.current = gsap.quickTo(ctaRef.current, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        yTo.current = gsap.quickTo(ctaRef.current, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.from(".contact-line", {
          yPercent: 105,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
            once: true,
          },
        });
      }

      return () => {
        if (ctaRef.current) {
          gsap.killTweensOf(ctaRef.current);
        }
      };
    },
    { scope: sectionRef },
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    xTo.current?.((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    yTo.current?.((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const resetCta = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-[100svh] bg-dark text-canvas"
      aria-labelledby="contact-title"
      data-cursor-tone="light"
    >
      <div className="page-shell flex min-h-[100svh] flex-col pt-[clamp(5rem,10vw,9rem)] pb-6 sm:pb-8">
        <p className="editorial-label text-dark-muted">Contact</p>

        <div className="my-auto py-12">
          <h2
            id="contact-title"
            className="contact-title text-[clamp(3.9rem,11.5vw,11.5rem)] leading-[0.81] font-medium tracking-[-0.07em] uppercase"
          >
            <span className="block overflow-hidden">
              <span className="contact-line block">Have something</span>
            </span>
            <span className="block overflow-hidden">
              <span className="contact-line block">interesting</span>
            </span>
            <span className="block overflow-hidden text-right text-accent">
              <span className="contact-line block">in mind?</span>
            </span>
          </h2>

          <a
            ref={ctaRef}
            href={`mailto:${siteConfig.email}`}
            className="group mt-12 inline-flex border-b border-canvas/50 pb-2 text-[clamp(1.6rem,3.4vw,3.3rem)] leading-none font-medium tracking-[-0.04em] sm:mt-16"
            data-cursor="label"
            data-cursor-label="Say hi"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetCta}
          >
            Let&apos;s talk
            <span
              className="ml-3 inline-block text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        <footer className="grid gap-8 border-t border-canvas/25 pt-5 text-xs sm:grid-cols-2 sm:items-end">
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-9">
              {socialLinks.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-line"
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex justify-between text-dark-muted sm:justify-end sm:gap-12">
            <p>{siteConfig.location}</p>
            <p>© 2026 {siteConfig.name}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
