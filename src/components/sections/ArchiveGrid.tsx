"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { filters, type Filter, type Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type Img = { src: string; w: number; h: number };
type Item = Project & { thumb: Img; full?: Img; screens: number };

// Longer pages scroll for longer, so the speed feels the same on every card.
const scrollDuration = (img: Img) => {
  const ratio = img.h / img.w;
  return ratio < 1.5 ? "group-hover:duration-[2s] group-focus-visible:duration-[2s]"
    : ratio < 3 ? "group-hover:duration-[4s] group-focus-visible:duration-[4s]"
    : ratio < 5 ? "group-hover:duration-[6s] group-focus-visible:duration-[6s]"
    : "group-hover:duration-[8s] group-focus-visible:duration-[8s]";
};

function TiltCard({ item, wide }: { item: Item; wide: boolean }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div className="h-full [perspective:1200px]" style={{ rotateX: rx, rotateY: ry }}>
      <Link
        href={`/projects/${item.slug}`}
        onPointerMove={onMove}
        onPointerLeave={reset}
        data-cursor="view"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-linen/10 bg-plum-850 transition-colors fine:hover:border-rust-bright/50"
      >
        {item.full ? (
          // Full-page screenshot that scrolls to its bottom on hover/focus (100cqh = frame height).
          // flex-1: the image area grows to fill the row, so cards beside a wide card get a taller image, not a gap.
          <div className={cn("relative aspect-[16/10] flex-1 overflow-hidden [container-type:size]", wide && "lg:aspect-[2.2/1]")}>
            <Image
              src={item.full.src}
              width={item.full.w}
              height={item.full.h}
              alt=""
              sizes={wide ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
              className={cn(
                "absolute inset-x-0 top-0 w-full transition-transform duration-700 ease-in-out group-hover:translate-y-[min(0px,calc(-100%_+_100cqh))] group-focus-visible:translate-y-[min(0px,calc(-100%_+_100cqh))] motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0",
                scrollDuration(item.full),
              )}
            />
          </div>
        ) : (
          // Phone lineups are contained, not cropped; the bg matches the cover's own stage colour.
          <div className={cn("relative aspect-[16/10] flex-1 overflow-hidden bg-[#1e191d]", wide && "lg:aspect-[2.2/1]")}>
            <Image
              src={item.thumb.src}
              width={item.thumb.w}
              height={item.thumb.h}
              alt=""
              sizes={wide ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
              className="absolute inset-0 size-full object-contain transition-transform duration-[1.1s] ease-out-expo group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={cn("font-semibold", wide ? "text-2xl" : "text-lg")}>{item.title}</h3>
              <p className="mt-1 text-sm text-cement-light">{item.category}</p>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-linen/15 transition-colors group-hover:border-rust-bright group-hover:bg-rust">
              <ArrowUpRight size={15} />
            </span>
          </div>
          <p className={cn("mt-3 text-sm leading-relaxed text-linen-dim", wide ? "line-clamp-2 max-w-xl" : "line-clamp-3")}>{item.summary}</p>
          <ul className="flex flex-wrap gap-2 pt-5" aria-label="Project type">
            {item.filters.map((f) => (
              <li key={f} className="tag">
                {f}
              </li>
            ))}
            <li className="tag border-rust-bright/40 text-rust-bright">{item.screens > 0 ? `${item.screens} screens` : "Full page"}</li>
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ArchiveGrid({ items }: { items: Item[] }) {
  const [active, setActive] = useState<Filter>("All");
  const shown = active === "All" ? items : items.filter((p) => p.filters.includes(active));
  const count = (f: Filter) => (f === "All" ? items.length : items.filter((p) => p.filters.includes(f)).length);

  return (
    <div className="mt-16 md:mt-20">
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters
          .filter((f) => count(f) > 0)
          .map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={cn(
                "relative isolate min-h-11 rounded-full border px-5 text-sm transition-colors",
                active === f ? "border-rust text-linen" : "border-linen/15 text-cement-light fine:hover:text-linen",
              )}
            >
              {active === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-rust" />}
              {f} <span className="ml-1 font-mono text-xs opacity-70">{count(f)}</span>
            </button>
          ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>

      <motion.ul layout className="mt-10 grid grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item, i) => {
            const wide = i % 10 === 0 || i % 10 === 6;
            return (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(wide && "lg:col-span-2")}
              >
                <TiltCard item={item} wide={wide} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
