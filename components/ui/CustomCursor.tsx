"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CUSTOM_CURSOR_LAYER_EVENT } from "@/lib/custom-cursor";

gsap.registerPlugin(useGSAP);

type CursorVariant = "default" | "fill" | "social" | "label";
type CursorTone = "dark" | "light";

type CursorState = {
  size: number;
  filled: boolean;
};

const cursorStates: Record<CursorVariant, CursorState> = {
  default: { size: 20, filled: false },
  fill: { size: 48, filled: true },
  social: { size: 46, filled: false },
  label: { size: 64, filled: true },
};

const getCursorTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLElement>("[data-cursor]");
};

const getCursorTone = (target: EventTarget | null): CursorTone => {
  if (!(target instanceof Element)) return "dark";

  return target.closest<HTMLElement>("[data-cursor-tone='light']")
    ? "light"
    : "dark";
};

const getCursorVariant = (target: HTMLElement | null): CursorVariant => {
  const variant = target?.dataset.cursor;

  return variant === "fill" || variant === "social" || variant === "label"
    ? variant
    : "default";
};

const getCursorInvertText = (target: HTMLElement | null) =>
  target?.querySelector<HTMLElement>("[data-cursor-invert]") ?? null;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleCursorLayerChange = (event: Event) => {
      setPortalTarget(
        (event as CustomEvent<HTMLElement | null>).detail ?? null,
      );
    };

    window.addEventListener(CUSTOM_CURSOR_LAYER_EVENT, handleCursorLayerChange);

    return () => {
      window.removeEventListener(
        CUSTOM_CURSOR_LAYER_EVENT,
        handleCursorLayerChange,
      );
    };
  }, []);

  useGSAP(
    (_, contextSafe) => {
      const cursor = cursorRef.current;
      const label = labelRef.current;

      if (!cursor || !label) return;

      const safe =
        contextSafe ??
        (<T extends (...args: never[]) => unknown>(callback: T): T => callback);

      const finePointerQuery = window.matchMedia(
        "(pointer: fine) and (hover: hover)",
      );
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const root = document.documentElement;
      let enabled = false;
      let currentTarget: HTMLElement | null = null;
      let currentTone: CursorTone = "dark";
      let currentInvertText: HTMLElement | null = null;
      let currentInvertRect: DOMRect | null = null;

      const refreshInvertRect = () => {
        currentInvertRect = currentInvertText?.getBoundingClientRect() ?? null;
      };

      const invertResizeObserver = new ResizeObserver(refreshInvertRect);

      const updateInvertTarget = (target: HTMLElement | null) => {
        const nextInvertText = getCursorInvertText(target);

        if (nextInvertText === currentInvertText) return;

        invertResizeObserver.disconnect();
        currentInvertText?.style.setProperty("--cursor-invert-radius", "0px");
        currentInvertText = nextInvertText;
        currentInvertRect = null;

        if (currentInvertText) {
          refreshInvertRect();
          invertResizeObserver.observe(currentInvertText);
        }
      };

      const updateInvertMask = () => {
        if (!currentInvertText || !currentInvertRect) return;

        const cursorX = Number.parseFloat(String(gsap.getProperty(cursor, "x")));
        const cursorY = Number.parseFloat(String(gsap.getProperty(cursor, "y")));
        const cursorWidth = Number.parseFloat(
          String(gsap.getProperty(cursor, "width")),
        );

        currentInvertText.style.setProperty(
          "--cursor-invert-x",
          `${cursorX - currentInvertRect.left}px`,
        );
        currentInvertText.style.setProperty(
          "--cursor-invert-y",
          `${cursorY - currentInvertRect.top}px`,
        );
        currentInvertText.style.setProperty(
          "--cursor-invert-radius",
          `${cursorWidth / 2}px`,
        );
      };

      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      const updateCursorState = safe(
        (target: HTMLElement | null, tone: CursorTone) => {
          const variant = getCursorVariant(target);
          const state = cursorStates[variant];
          const cursorColor =
            tone === "light" ? "var(--canvas)" : "var(--ink)";
          const labelColor =
            tone === "light" ? "var(--ink)" : "var(--canvas)";
          const labelText =
            variant === "label" ? target?.dataset.cursorLabel ?? "View" : "";

          if (label.textContent !== labelText) {
            label.textContent = labelText;
          }

          gsap.to(cursor, {
            width: state.size,
            height: state.size,
            backgroundColor: state.filled ? cursorColor : "transparent",
            borderColor: state.filled ? "transparent" : cursorColor,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(label, {
            autoAlpha: labelText ? 1 : 0,
            color: labelColor,
            duration: 0.16,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      );

      const showCursor = safe(() => {
        gsap.to(cursor, {
          autoAlpha: 1,
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      const hideCursor = safe(() => {
        gsap.to(cursor, {
          autoAlpha: 0,
          duration: 0.14,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      const handlePointerMove = safe((event: PointerEvent) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
        xTo(event.clientX);
        yTo(event.clientY);
        showCursor();

        const target = getCursorTarget(event.target);
        const tone = getCursorTone(event.target);

        if (target !== currentTarget || tone !== currentTone) {
          currentTarget = target;
          currentTone = tone;
          updateCursorState(target, tone);
        }

        updateInvertTarget(target);
      });

      const handleWindowMouseOut = safe((event: MouseEvent) => {
        if (!event.relatedTarget) {
          hideCursor();
        }
      });

      const handleWindowBlur = safe(() => hideCursor());

      const addPointerListeners = () => {
        window.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        window.addEventListener("mouseout", handleWindowMouseOut);
        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("resize", refreshInvertRect, {
          passive: true,
        });
        window.addEventListener("scroll", refreshInvertRect, {
          passive: true,
          capture: true,
        });
        gsap.ticker.add(updateInvertMask);
      };

      const removePointerListeners = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("mouseout", handleWindowMouseOut);
        window.removeEventListener("blur", handleWindowBlur);
        window.removeEventListener("resize", refreshInvertRect);
        window.removeEventListener("scroll", refreshInvertRect, true);
        gsap.ticker.remove(updateInvertMask);
        invertResizeObserver.disconnect();
        updateInvertTarget(null);
      };

      const disableCursor = () => {
        if (!enabled) return;

        enabled = false;
        removePointerListeners();
        root.classList.remove("custom-cursor-active");
        gsap.set(cursor, { autoAlpha: 0 });
      };

      const enableCursor = () => {
        if (enabled) return;

        enabled = true;
        root.classList.add("custom-cursor-active");
        gsap.set(cursor, {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
        });
        updateCursorState(currentTarget, currentTone);
        addPointerListeners();
      };

      const updateCapability = () => {
        if (finePointerQuery.matches && !reducedMotionQuery.matches) {
          enableCursor();
          return;
        }

        disableCursor();
      };

      finePointerQuery.addEventListener("change", updateCapability);
      reducedMotionQuery.addEventListener("change", updateCapability);
      updateCapability();

      return () => {
        finePointerQuery.removeEventListener("change", updateCapability);
        reducedMotionQuery.removeEventListener("change", updateCapability);
        disableCursor();
      };
    },
    { scope: cursorRef, dependencies: [portalTarget], revertOnUpdate: true },
  );

  const cursor = (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );

  return portalTarget ? createPortal(cursor, portalTarget) : cursor;
}
