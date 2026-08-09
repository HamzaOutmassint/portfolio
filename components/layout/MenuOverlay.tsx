"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

type MenuOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

const closeDuration = 220;

export function MenuOverlay({ open, onOpenChange }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!open || !dialog) {
      return;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    returnFocusRef.current =
      activeElement && activeElement !== document.body
        ? activeElement
        : document.querySelector<HTMLElement>('[aria-controls="hero-menu"]');
    const previousOverflow = document.body.style.overflow;

    dialog.dataset.state = "open";
    if (!dialog.open) {
      dialog.showModal();
    }
    document.body.style.overflow = "hidden";

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
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  const closeMenu = (afterClose?: () => void) => {
    const dialog = dialogRef.current;

    if (!dialog?.open || dialog.dataset.state === "closing") {
      return;
    }

    dialog.dataset.state = "closing";
    closeTimerRef.current = window.setTimeout(() => {
      const returnFocus = returnFocusRef.current;
      dialog.close();
      onOpenChange(false);
      closeTimerRef.current = null;
      window.requestAnimationFrame(() => {
        returnFocus?.focus();
        afterClose?.();
      });
    }, closeDuration);
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
