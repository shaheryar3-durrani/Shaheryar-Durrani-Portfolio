"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// Shared instance so nav links and back-to-top can drive the same scroller.
let lenis: Lenis | null = null;

export function scrollToTarget(target: string | number) {
  const reduce = prefersReducedMotion();
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "string" ? -72 : 0, duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ autoRaf: false, lerp: 0.11 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New route: start at the top (or at the hash target) and re-measure triggers.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) lenis?.scrollTo(hash, { immediate: true, offset: -72 });
    else lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
