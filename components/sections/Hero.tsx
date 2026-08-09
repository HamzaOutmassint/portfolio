"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { bricolageGrotesque } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const intro = gsap.timeline({
        defaults: { duration: 0.58, ease: "power3.out" },
      });

      intro
        .fromTo(
          ".hero-brand",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1 },
        )
        .fromTo(
          ".hero-menu-trigger",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1 },
          0.08,
        )
        .fromTo(
          ".hero-name",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.72 },
          0.18,
        )
        .fromTo(
          ".hero-support",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.07 },
          0.36,
        )
        .fromTo(
          ".hero-edge-item",
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.48 },
          0.5,
        );
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="hero-frame relative min-h-[100svh] overflow-hidden border-b border-line"
      aria-labelledby="hero-title"
    >
      <header className={`${bricolageGrotesque.className} hero-topbar absolute inset-x-0 z-50 flex items-center justify-between`}>
        <Link
          href="/"
          className="hero-brand editorial-label capitalize! transition-opacity hover:opacity-55 max-sm:text-[16px]! lg:text-[18px]!"
          aria-label={`${siteConfig.name}, home`}
        >
          {siteConfig.shortName}
        </Link>
        <button
          type="button"
          className="hero-menu-trigger editorial-label cursor-pointer transition-opacity hover:opacity-55 capitalize! font-medium! max-sm:text-[16px]! lg:text-[18px]!"
          aria-expanded={menuOpen}
          aria-controls="hero-menu"
          data-cursor="fill"
          onClick={openMenu}
        >
          Menu
        </button>
      </header>

      <div className="hero-center absolute inset-x-0 top-1/2 -translate-y-1/2 px-[var(--hero-gutter)] text-center">
        <h1
          id="hero-title"
          className={`${bricolageGrotesque.className} hero-name mx-auto max-w-[100rem] text-[clamp(3rem,7vw,8rem)] leading-[0.88] font-medium tracking-[-0.065em] text-balance capitalize max-sm:text-[34px]!`}
        >
          {siteConfig.name}
        </h1>
        <p className={`${bricolageGrotesque.className} hero-support mt-[clamp(1rem,2.2svh,1.5rem)] text-[clamp(3rem,7vw,8rem)] leading-[0.88] font-medium tracking-[-0.055em] max-sm:text-[34px]!`}>
          {siteConfig.role}
        </p>
        <p className="hero-support mt-4 text-[clamp(0.78rem,1vw,0.98rem)] leading-snug text-muted capitalize max-sm:text-[15px]! lg:text-[18px] lg:mt-5">
          {siteConfig.tagline}
        </p>
      </div>

      <nav
        className="hero-socials hero-edge-item absolute z-50"
        aria-label="Social links"
      >
        <ul className="flex flex-col items-start gap-2.5 text-[0.65rem] leading-none font-semibold tracking-[0.12em] uppercase sm:text-[0.7rem]">
          <li>
            <a
              href={siteConfig.github}
              className="inline-block transition-[opacity,transform] duration-300 hover:opacity-55"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              data-cursor="social"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6 fill-current"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.344-3.369-1.344-.455-1.16-1.11-1.469-1.11-1.469-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.273.098-2.654 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.34c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.381.203 2.401.1 2.654.64.7 1.028 1.594 1.028 2.687 0 3.848-2.338 4.695-4.566 4.943.359.31.678.92.678 1.853 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.018 10.018 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={siteConfig.linkedin}
              className="inline-block transition-[opacity,transform] duration-300 hover:opacity-55"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              data-cursor="social"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6 fill-current"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <div className={`${bricolageGrotesque.className} hero-bottom absolute inset-x-0 z-20 flex items-end justify-between gap-6`}>
        <p className="hero-edge-item flex max-w-[70%] flex-wrap gap-x-2 gap-y-0.5 text-[0.62rem] leading-tight font-medium tracking-[0.08em] uppercase max-sm:text-[16px]! sm:max-w-none sm:text-[0.7rem] lg:text-[17px]">
          <span>{siteConfig.location}</span>
        </p>
        <p
          className="hero-edge-item shrink-0 rotate-180 text-[0.62rem] leading-none font-medium tracking-[0.1em] uppercase [writing-mode:vertical-rl] max-sm:text-[16px]! sm:text-[0.7rem] lg:text-[17px]"
          aria-label="Sound is off and unavailable"
        >
          Sound <span className="font-semibold">off</span>
        </p>
      </div>

      <MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} />
    </section>
  );
}
