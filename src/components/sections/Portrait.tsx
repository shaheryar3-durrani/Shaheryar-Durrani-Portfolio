"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = { src: string; width: number; height: number; alt: string };

// Subject focus inside the 4:5 crop (face slightly left of centre, upper half).
const FOCUS = { x: 0.43, y: 0.42, rx: 0.52, ry: 0.62 };
const REPEL_RADIUS = 80;
const REPEL_FORCE = 22;

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

// Halftone dots gather into the portrait as the section scrolls in; the photo then fades up
// in their place. On fine pointers the dots near the cursor scatter and drift back.
export default function Portrait({ src, width, height, alt }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cv = canvas.current!;
      const ctx = cv.getContext("2d")!;
      const box = wrap.current!;
      let dots: { sx: number; sy: number; tx: number; ty: number; r: number; c: string; seed: number }[] = [];
      let ox = new Float32Array(0);
      let oy = new Float32Array(0);
      let W = 0, H = 0, progress = 0, photoMix = 0, raf = 0;
      const pointer = { x: -9999, y: -9999, on: false };
      const img = new window.Image();
      img.src = src;

      gsap.set(photo.current, { opacity: 0 });

      const build = () => {
        const rect = box.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        if (!W || !H || !img.complete) return;
        const dpr = Math.min(window.devicePixelRatio, 2);
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const off = document.createElement("canvas");
        off.width = Math.round(W);
        off.height = Math.round(H);
        const octx = off.getContext("2d", { willReadFrequently: true })!;
        octx.drawImage(img, 0, 0, off.width, off.height);
        const data = octx.getImageData(0, 0, off.width, off.height).data;
        const gap = W < 420 ? 6 : 7;
        const rand = rng(11);
        dots = [];
        for (let y = gap / 2; y < H; y += gap) {
          for (let x = gap / 2; x < W; x += gap) {
            const i = (Math.floor(y) * off.width + Math.floor(x)) * 4;
            const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const dx = (x / W - FOCUS.x) / FOCUS.rx;
            const dy = (y / H - FOCUS.y) / FOCUS.ry;
            const focus = clamp01(1 - (dx * dx + dy * dy));
            const red = r > 120 && r > g * 1.7 && r > b * 1.7; // tie and pocket square
            const weight = (red ? 0.75 : lum) * Math.pow(focus, 0.7);
            if (weight < 0.07) continue;
            dots.push({
              tx: x,
              ty: y,
              sx: x + (rand() - 0.5) * W * 1.1,
              sy: y + (rand() - 0.2) * H * 0.9,
              r: Math.max(0.5, (gap / 2) * Math.pow(weight, 0.75)),
              c: red ? "#c8704f" : lum > 0.72 ? "#f2ece5" : lum > 0.45 ? "#b29762" : "#9f553c",
              seed: rand(),
            });
          }
        }
        ox = new Float32Array(dots.length);
        oy = new Float32Array(dots.length);
        requestDraw();
      };

      const draw = () => {
        raf = 0;
        ctx.clearRect(0, 0, W, H);
        const dotAlpha = 1 - smooth(clamp01(photoMix * 1.5)); // dots hand over fully to the photo
        let moving = false;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const e = smooth(clamp01(progress * 1.35 - d.seed * 0.35));
          let x = d.sx + (d.tx - d.sx) * e;
          let y = d.sy + (d.ty - d.sy) * e;
          // Repel from the cursor, ease back when it leaves.
          let txo = 0, tyo = 0;
          if (pointer.on) {
            const vx = x - pointer.x, vy = y - pointer.y;
            const dist = Math.hypot(vx, vy);
            if (dist < REPEL_RADIUS && dist > 0.01) {
              const f = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
              txo = (vx / dist) * f;
              tyo = (vy / dist) * f;
            }
          }
          ox[i] += (txo - ox[i]) * 0.18;
          oy[i] += (tyo - oy[i]) * 0.18;
          if (Math.abs(ox[i] - txo) > 0.1 || Math.abs(oy[i] - tyo) > 0.1) moving = true;
          x += ox[i];
          y += oy[i];
          ctx.globalAlpha = (0.25 + 0.75 * e) * dotAlpha;
          ctx.fillStyle = d.c;
          ctx.beginPath();
          ctx.arc(x, y, d.r * (0.5 + 0.5 * e), 0, Math.PI * 2);
          ctx.fill();
        }
        if (moving) requestDraw();
      };
      const requestDraw = () => {
        if (!raf) raf = requestAnimationFrame(draw);
      };

      img.onload = build;
      if (img.complete) build();
      const ro = new ResizeObserver(build);
      ro.observe(box);

      const st = ScrollTrigger.create({
        trigger: box,
        start: "top 85%",
        end: "center 60%",
        scrub: true,
        onUpdate: (self) => {
          progress = clamp01(self.progress / 0.7);
          photoMix = clamp01((self.progress - 0.55) / 0.4);
          gsap.set(photo.current, { opacity: photoMix });
          requestDraw();
        },
      });

      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = box.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
        pointer.on = true;
        requestDraw();
      };
      const leave = () => {
        pointer.on = false;
        requestDraw();
      };
      box.addEventListener("pointermove", move);
      box.addEventListener("pointerleave", leave);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        st.kill();
        box.removeEventListener("pointermove", move);
        box.removeEventListener("pointerleave", leave);
      };
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="relative aspect-[4/5] w-full">
      {/* The photo, edges feathered into the page so the busy background disappears */}
      <div
        ref={photo}
        className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_20%,black_76%,transparent),linear-gradient(to_bottom,transparent,black_7%,black_68%,transparent)]"
      >
        <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 768px) 40vw, 90vw" className="size-full object-cover" />
      </div>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
    </div>
  );
}
