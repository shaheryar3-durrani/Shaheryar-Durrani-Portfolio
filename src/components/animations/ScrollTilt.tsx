"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Showcase media straightens out of a perspective tilt and scales up as it scrolls into place.
export default function ScrollTilt({ children, className, flip = false }: { children: React.ReactNode; className?: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current!.firstElementChild,
        { rotateX: 14, rotateY: flip ? 10 : -10, scale: 0.86, y: 60 },
        { rotateX: 0, rotateY: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 95%", end: "center 55%", scrub: 0.5 } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`[perspective:1600px] ${className ?? ""}`}>
      <div className="will-change-transform">{children}</div>
    </div>
  );
}
