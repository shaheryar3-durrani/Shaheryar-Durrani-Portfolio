"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { heroPanels } from "@/components/3d/heroPanels";
import { cn } from "@/lib/cn";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

const posterTransforms = [
  "top-[8%] left-[4%] w-[62%] [transform:perspective(1400px)_rotateY(24deg)_rotateZ(-2deg)] opacity-70",
  "top-[30%] left-[22%] w-[66%] [transform:perspective(1400px)_rotateY(-12deg)]",
  "top-[56%] left-[38%] w-[58%] [transform:perspective(1400px)_rotateY(-20deg)_rotateZ(2deg)]",
];

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2") || !!c.getContext("webgl");
  } catch {
    return false;
  }
}

// Static poster first (also the fallback for mobile, reduced motion and no WebGL), WebGL on top when ready.
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      canUseWebGL();
    if (!ok) return;
    // Let the loader and first paint finish before pulling in three.js.
    const id = (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600)))(() => setUse3D(true));
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      if (window.cancelIdleCallback && typeof id === "number") window.cancelIdleCallback(id);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      <div className={cn("absolute inset-0 transition-opacity duration-1000", ready && "opacity-0")}>
        {heroPanels.map((p, i) => (
          <div
            key={p.slug}
            className={cn("absolute overflow-hidden rounded-xl border border-linen/10 bg-plum-800 p-1.5 pt-5 shadow-2xl shadow-black/50", posterTransforms[i])}
          >
            <span className="absolute top-2 left-3 flex gap-1">
              <i className="size-1.5 rounded-full bg-rust" />
              <i className="size-1.5 rounded-full bg-maple" />
              <i className="size-1.5 rounded-full bg-avocado" />
            </span>
            <Image src={p.src} alt="" width={800} height={500} fetchPriority={i === 1 ? "high" : "auto"} loading={i === 1 ? "eager" : "lazy"} className="rounded-md" sizes="(min-width: 768px) 35vw, 70vw" />
          </div>
        ))}
      </div>
      {use3D && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <HeroScene active={inView} onReady={onReady} />
        </div>
      )}
    </div>
  );
}
