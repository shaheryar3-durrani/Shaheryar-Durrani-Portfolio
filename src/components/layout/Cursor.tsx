"use client";

import { useEffect, useRef } from "react";

// Desktop-only follower. The native cursor stays visible; this only adds a soft ring.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;
    const d = dot.current;
    const r = ring.current;
    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, target = 1, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as Element).closest("a, button, [data-cursor]");
      target = el ? (el.getAttribute("data-cursor") === "view" ? 2.6 : 1.7) : 1;
      r.dataset.view = el?.getAttribute("data-cursor") === "view" ? "true" : "false";
      d.style.opacity = r.style.opacity = "1";
    };
    const leave = () => (d.style.opacity = r.style.opacity = "0");
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (target - scale) * 0.14;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden fine:block">
      <div ref={dot} className="absolute -top-1 -left-1 size-2 rounded-full bg-rust-bright opacity-0 transition-opacity" />
      <div
        ref={ring}
        className="group absolute -top-4 -left-4 grid size-8 place-items-center rounded-full border border-linen/40 opacity-0 transition-[opacity,background-color,border-color] duration-300 data-[view=true]:border-transparent data-[view=true]:bg-rust/90"
      >
        <span className="font-mono text-[0.32rem] tracking-widest text-linen uppercase opacity-0 transition-opacity group-data-[view=true]:opacity-100">
          View
        </span>
      </div>
    </div>
  );
}
