"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NumberedBlock, Overview } from "@/components/work/CaseStudyPrimitives";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const homepageSource = "/projects/voyspire/homepage.jpg";

export function VoyspireCaseStudy() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageReady, setImageReady] = useState(false);

  useGSAP(
    () => {
      const showcase = showcaseRef.current;
      const viewport = viewportRef.current;
      const image = imageRef.current;

      if (!showcase || !viewport || !image || !imageReady) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (window.matchMedia("(pointer: coarse)").matches) return;

          const getTravel = () =>
            Math.max(0, image.getBoundingClientRect().height - viewport.clientHeight);
          const getScrollDistance = () => {
            const travel = getTravel();
            return Math.max(
              window.innerHeight * 1.5,
              Math.min(window.innerHeight * 2.4, travel * 0.55),
            );
          };

          const animation = gsap.to(image, {
            y: () => -getTravel(),
            ease: "none",
            scrollTrigger: {
              trigger: showcase,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              pin: viewport,
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });

          ScrollTrigger.refresh();
          return () => animation.kill();
        },
      );

      return () => media.revert();
    },
    {
      scope: scopeRef,
      dependencies: [imageReady],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={scopeRef} className="case-study-content py-[var(--section-space)]">
      <section ref={showcaseRef} className="voyspire-showcase page-shell">
        <div className="mb-3 flex justify-between text-[0.68rem] font-semibold tracking-[0.1em] text-muted uppercase">
          <span>Voyspire — Homepage</span>
          <span>01 / 01</span>
        </div>
        <div
          ref={viewportRef}
          className="voyspire-showcase-viewport overflow-hidden border border-line bg-[#dedbd0]"
        >
          <Image
            ref={imageRef}
            src={homepageSource}
            alt="Full Voyspire travel discovery homepage from opening hero through community and footer content"
            width={1280}
            height={4263}
            loading="eager"
            sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1600px) 88vw, 1400px"
            className="block h-auto w-full"
            onLoad={() => {
              setImageReady(true);
              window.requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
          />
        </div>
      </section>

      <div className="page-shell mt-[var(--case-study-space)]">
        <Overview detail="The page layers story-led discovery, destinations and practical travel content into one editorial journey.">
          An editorial travel home built to make places, stories and shared experiences feel connected.
        </Overview>

        <div className="mt-[var(--case-study-space)] grid gap-12 lg:grid-cols-2 lg:gap-8">
          <NumberedBlock number="01" title="Challenge">
            Give a broad mix of travel content an editorial sense of discovery without losing orientation.
          </NumberedBlock>
          <NumberedBlock number="02" title="Solution">
            A clear hierarchy moves from stories to experiences and tips, with each section adding a new reason to explore.
          </NumberedBlock>
        </div>
      </div>
    </div>
  );
}
