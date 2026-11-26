"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = { children: React.ReactNode; className?: string; x?: number; y?: number };

// Scroll-scrubbed drift in percent of the element's own size.
export default function Parallax({ children, className, x = 0, y = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { xPercent: -x / 2, yPercent: -y / 2 },
        { xPercent: x / 2, yPercent: y / 2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
