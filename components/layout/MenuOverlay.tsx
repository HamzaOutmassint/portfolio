"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CursorInvertText } from "@/components/ui/CursorInvertText";
import { bricolageGrotesque } from "@/lib/fonts";
import { setCustomCursorLayer } from "@/lib/custom-cursor";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(useGSAP);

type MenuOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navigationItems = [
  { label: "About me", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

const isDialogOpen = (dialog: HTMLDialogElement) =>
  dialog.open || dialog.hasAttribute("open");

const showDialog = (dialog: HTMLDialogElement) => {
  if (isDialogOpen(dialog)) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }

  dialog.setAttribute("open", "");
};

const closeDialog = (dialog: HTMLDialogElement) => {
  if (!isDialogOpen(dialog)) return;

  if (typeof dialog.close === "function") {
    dialog.close();
    return;
  }

  dialog.removeAttribute("open");
};

export function MenuOverlay({ open, onOpenChange }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cursorLayerRef = useRef<HTMLDivElement>(null);
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

      showDialog(dialog);
      setCustomCursorLayer(cursorLayerRef.current);
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
            duration: 1.02,
            ease: "power4.inOut",
          })
          .to(topbar, { y: 0, autoAlpha: 1, duration: 0.52 }, 0.34)
          .to(
            links,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.09,
            },
            0.44,
          );
      }

      const focusFrame = window.requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });

      return () => {
        window.cancelAnimationFrame(focusFrame);
        document.body.style.overflow = previousOverflow;
        setCustomCursorLayer(null);
        closeDialog(dialog);
      };
    },
    { scope: dialogRef, dependencies: [open], revertOnUpdate: true },
  );

  const closeMenu = (afterClose?: () => void) => {
    contextSafe(() => {
      const dialog = dialogRef.current;

      if (!dialog || !isDialogOpen(dialog) || closingRef.current) {
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
        setCustomCursorLayer(null);
        closeDialog(dialog);
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
            duration: 0.32,
            stagger: { each: 0.05, from: "end" },
            ease: "power2.in",
          },
          0,
        )
        .to(
          topbar,
          { y: -10, autoAlpha: 0, duration: 0.3, ease: "power2.in" },
          0,
        )
        .to(
          dialog,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.94,
            ease: "power4.inOut",
          },
          0.12,
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

      <div className="menu-overlay-topbar absolute inset-x-0 z-20 flex items-center justify-between">
        <Link
          href="/"
          className="editorial-label max-sm:text-[16px]! lg:text-[18px]!"
          aria-label={`${siteConfig.name}, home`}
          data-cursor="fill"
          onClick={() => closeMenu()}
        >
          <CursorInvertText>{siteConfig.shortName}</CursorInvertText>
        </Link>
        <button
          type="button"
          className="editorial-label cursor-pointer max-sm:text-[16px]! lg:text-[18px]!"
          data-cursor="fill"
          onClick={() => closeMenu()}
        >
          <CursorInvertText>Close</CursorInvertText>
        </button>
      </div>

      <nav
        className="absolute inset-0 z-10 grid place-items-center"
        aria-label="Menu"
      >
        <ul
          className={`${bricolageGrotesque.className} menu-overlay-links flex flex-col items-center gap-[clamp(4.25rem,3.2svh,2.25rem)] text-center`}
        >
          {navigationItems.map((item, index) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                className="menu-overlay-link link-line block text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.9] font-medium tracking-[-0.055em]"
                data-cursor="fill"
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(item.href);
                }}
              >
                <CursorInvertText>{item.label}</CursorInvertText>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        ref={cursorLayerRef}
        className="menu-overlay-cursor-layer"
        aria-hidden="true"
      />
    </dialog>
  );
}
