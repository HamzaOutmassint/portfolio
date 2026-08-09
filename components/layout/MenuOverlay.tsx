"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(useGSAP);

type MenuOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export function MenuOverlay({ open, onOpenChange }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const dialog = dialogRef.current;

      if (!open || !dialog) {
        return;
      }

      const topbar = dialog.querySelector<HTMLElement>(".menu-overlay-topbar");
      const links = Array.from(
        dialog.querySelectorAll<HTMLElement>(".menu-overlay-link"),
      );
      const activeElement = document.activeElement as HTMLElement | null;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const previousOverflow = document.body.style.overflow;

      closingRef.current = false;
      returnFocusRef.current =
        activeElement && activeElement !== document.body
          ? activeElement
          : document.querySelector<HTMLElement>('[aria-controls="hero-menu"]');

      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";

      if (reducedMotion) {
        gsap.set(dialog, {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
        });
        gsap.set([topbar, ...links], { y: 0, autoAlpha: 1 });
      } else {
        const openingTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        openingTimeline
          .set(dialog, {
            clipPath: "inset(0% 0% 100% 0%)",
            autoAlpha: 1,
          })
          .set(topbar, { y: -12, autoAlpha: 0 })
          .set(links, { y: 24, autoAlpha: 0 })
          .to(dialog, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.78,
            ease: "power4.inOut",
          })
          .to(topbar, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.26)
          .to(
            links,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.48,
              stagger: 0.07,
            },
            0.34,
          );
      }

      const focusFrame = window.requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });

      return () => {
        window.cancelAnimationFrame(focusFrame);
        document.body.style.overflow = previousOverflow;
        if (dialog.open) {
          dialog.close();
        }
      };
    },
    { scope: dialogRef, dependencies: [open], revertOnUpdate: true },
  );

  const closeMenu = (afterClose?: () => void) => {
    contextSafe(() => {
      const dialog = dialogRef.current;

      if (!dialog?.open || closingRef.current) {
        return;
      }

      const topbar = dialog.querySelector<HTMLElement>(
        ".menu-overlay-topbar",
      );
      const links = Array.from(
        dialog.querySelectorAll<HTMLElement>(".menu-overlay-link"),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      closingRef.current = true;
      gsap.killTweensOf([dialog, topbar, ...links]);

      const finishClose = () => {
        const returnFocus = returnFocusRef.current;
        dialog.close();
        onOpenChange(false);
        closingRef.current = false;
        window.requestAnimationFrame(() => {
          returnFocus?.focus();
          afterClose?.();
        });
      };

      if (reducedMotion) {
        finishClose();
        return;
      }

      gsap
        .timeline({ onComplete: finishClose })
        .to(
          links,
          {
            y: -14,
            autoAlpha: 0,
            duration: 0.24,
            stagger: { each: 0.035, from: "end" },
            ease: "power2.in",
          },
          0,
        )
        .to(
          topbar,
          { y: -10, autoAlpha: 0, duration: 0.22, ease: "power2.in" },
          0,
        )
        .to(
          dialog,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.72,
            ease: "power4.inOut",
          },
          0.08,
        );
    })();
  };

  const navigateTo = (href: string) => {
    closeMenu(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      window.history.pushState(null, "", href);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  };

  return (
    <dialog
      ref={dialogRef}
      id="hero-menu"
      className="menu-overlay"
      aria-labelledby="menu-title"
      onCancel={(event) => {
        event.preventDefault();
        closeMenu();
      }}
    >
      <h2 id="menu-title" className="sr-only">
        Primary navigation
      </h2>

      <div className="menu-overlay-topbar absolute inset-x-0 flex items-center justify-between">
        <Link
          href="/"
          className="editorial-label transition-opacity hover:opacity-55"
          aria-label={`${siteConfig.name}, home`}
          onClick={() => closeMenu()}
        >
          {siteConfig.shortName}
        </Link>
        <button
          type="button"
          className="editorial-label cursor-pointer transition-opacity hover:opacity-55"
          onClick={() => closeMenu()}
        >
          Close
        </button>
      </div>

      <nav className="absolute inset-0 grid place-items-center" aria-label="Menu">
        <ul className="menu-overlay-links flex flex-col items-center gap-[clamp(0.7rem,2.1svh,1.4rem)] text-center">
          {navigationItems.map((item, index) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                className="menu-overlay-link link-line block text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.9] font-medium tracking-[-0.055em] uppercase"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </dialog>
  );
}
