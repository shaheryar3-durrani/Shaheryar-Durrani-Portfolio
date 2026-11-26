"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const KEY = "shd-intro";

// Sample the monogram letters as dot targets on an offscreen canvas.
function sampleText(w: number, h: number, gap: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const size = Math.min(w * 0.26, 220);
  ctx.font = `600 ${size}px ${getComputedStyle(document.documentElement).getPropertyValue("--font-cormorant") || "serif"}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(profile.initials, w / 2, h / 2);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < h; y += gap) for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 128) pts.push([x, y]);
  return pts;
}

// First visit per session: halftone dots converge into the SMSD monogram, then the page appears.
export default function Loader() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Repeat visit: CSS already hides the loader (html[data-visited]), nothing to run.
    if (document.documentElement.hasAttribute("data-visited")) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const W = window.innerWidth, H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0;
    const timers: number[] = [];
    const finish = () => {
      setLeaving(true);
      timers.push(window.setTimeout(() => setDone(true), 600));
      // Drop the hero's intro delay for later client navigations, once its entrance has finished
      // (changing the delay mid-animation would make the hero text jump).
      timers.push(window.setTimeout(() => document.documentElement.setAttribute("data-visited", ""), 2400));
    };

    if (reduce) {
      timers.push(window.setTimeout(finish, 300));
      return () => timers.forEach(clearTimeout);
    }

    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]).then(() => {
      const targets = sampleText(W, H, W < 640 ? 5 : 6);
      const colors = ["#c8704f", "#b29762", "#f2ece5", "#9f553c"];
      const dots = targets.map(([tx, ty], i) => ({
        sx: Math.random() * W,
        sy: Math.random() * H,
        tx,
        ty,
        seed: Math.random(),
        c: colors[i % colors.length],
      }));
      const start = performance.now();
      const DURATION = 1150;
      const draw = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        ctx.clearRect(0, 0, W, H);
        for (const d of dots) {
          const l = Math.min(1, Math.max(0, p * 1.35 - d.seed * 0.35));
          const e = 1 - Math.pow(1 - l, 3);
          const drift = (1 - e) * 18 * Math.sin(now / 300 + d.seed * 10);
          ctx.globalAlpha = 0.3 + 0.7 * e;
          ctx.fillStyle = d.c;
          ctx.beginPath();
          ctx.arc(d.sx + (d.tx - d.sx) * e + drift, d.sy + (d.ty - d.sy) * e, 0.8 + e * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (p < 1) raf = requestAnimationFrame(draw);
        else timers.push(window.setTimeout(finish, 420));
      };
      raf = requestAnimationFrame(draw);
    });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (done) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`loader fixed inset-0 z-[90] grid place-items-center bg-plum-950 transition-opacity duration-500 ${leaving ? "opacity-0" : ""}`}
    >
      <canvas ref={canvas} className="absolute inset-0 size-full" aria-hidden />
      <p className="eyebrow absolute bottom-10">
        {profile.name} · {profile.tagline}
      </p>
      <span className="sr-only">Loading {profile.name} portfolio</span>
    </div>
  );
}
