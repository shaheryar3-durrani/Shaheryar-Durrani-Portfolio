"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { education, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type Chapter = { start: string; end?: string; org: string; place: string; title: string; summary: string; bullets: string[] };

// Oldest first, so the timeline reads left to right; opens on the current role.
const chapters: Chapter[] = [
  ...education.map((e) => ({ start: e.start, end: e.end, org: e.school, place: e.location, title: e.degree, summary: e.summary, bullets: [] })),
  ...[...experience].reverse().map((r) => ({
    start: r.start,
    end: r.end,
    org: r.company,
    place: r.location,
    title: r.role,
    summary: r.summary,
    bullets: r.stack.slice(0, 6),
  })),
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const year = (ym: string) => ym.slice(0, 4);
const dotted = (ym: string) => ym.replace("-", ".");
const ease = [0.16, 1, 0.3, 1] as const;

// "Chrono archive": one chapter at a time, stepped with the arrows or the year timeline.
export default function Profile() {
  const [active, setActive] = useState(chapters.length - 1);
  const reduce = useReducedMotion();
  const c = chapters[active];
  const endYear = c.end ? year(c.end) : "Now";
  // Same-year chapters show the start month instead of repeating the year.
  const small = c.end && year(c.end) === year(c.start) ? MONTHS[Number(c.start.slice(5, 7)) - 1] : year(c.start);
  const go = (i: number) => setActive(Math.min(chapters.length - 1, Math.max(0, i)));

  return (
    <section id="profile" aria-labelledby="profile-title" className="section overflow-hidden border-t border-linen/10 bg-plum-950">
      <div className="shell">
        <header className="text-center">
          <h2 id="profile-title" className="font-serif text-3xl md:text-4xl">
            [ At a Glance ]
          </h2>
          <p className="mt-2 text-sm text-cement-light">Roles, places and chapters, filed in time.</p>
        </header>

        <div className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          {/* Arrows */}
          <div className="hidden flex-col justify-between md:col-span-1 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous chapter"
              className="grid size-11 place-items-center rounded-md bg-plum-850 text-linen transition-colors fine:hover:bg-rust disabled:opacity-30"
            >
              <ChevronUp size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === chapters.length - 1}
              aria-label="Next chapter"
              className="grid size-11 place-items-center rounded-md bg-plum-850 text-linen transition-colors fine:hover:bg-rust disabled:opacity-30"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease }}
              className="grid gap-8 md:col-span-11 md:grid-cols-11 md:gap-12"
              aria-live="polite"
            >
              {/* Years */}
              <div className="font-serif italic md:col-span-4 md:text-right" aria-hidden>
                <p className="flex items-center gap-4 text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-linen-dim md:justify-end">
                  <span className="h-px w-16 bg-linen/40" />
                  {small}
                </p>
                <p className="mt-2 text-[clamp(5rem,9vw,9rem)] leading-[0.85] text-linen">{endYear}</p>
              </div>

              {/* Details */}
              <div className="md:col-span-7">
                <h3 className="text-2xl font-semibold">{c.org}</h3>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 font-serif text-lg text-linen-dim">
                  <span>{c.place}, Pakistan</span>
                  <span className="text-linen">
                    {dotted(c.start)} – {c.end ? dotted(c.end) : "Present"}
                  </span>
                </div>
                <p className="mt-3 font-serif text-[clamp(2.2rem,4.2vw,4rem)] leading-[1] text-linen italic">{c.title}</p>
                <p className="mt-6 max-w-2xl leading-relaxed text-cement-light">{c.summary}</p>
                {c.bullets.length > 0 && (
                  <ul className="mt-6 space-y-1.5 text-sm text-linen-dim">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <span className="size-1 rounded-full bg-linen-dim" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Year timeline (grid-cols-4 = one column per chapter) */}
        <div className="relative mt-20 md:mt-24">
          <span aria-hidden className="absolute top-[7px] right-0 left-0 border-t border-dotted border-linen/30" />
          <span aria-hidden className="absolute top-[7px] right-[12.5%] left-[12.5%] h-px bg-linen/60" />
          <ol className="relative grid grid-cols-4">
            {chapters.map((ch, i) => {
              const on = i === active;
              return (
                <li key={ch.start} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "step" : undefined}
                    aria-label={`${year(ch.start)}: ${ch.title}, ${ch.org}`}
                    className="group relative flex min-h-11 flex-col items-center gap-3 px-2"
                  >
                    {on && (
                      <motion.span
                        layoutId="chrono-glow"
                        aria-hidden
                        className="absolute -top-9 size-20 rounded-full bg-[radial-gradient(closest-side,rgba(200,112,79,0.55),transparent)] blur-md"
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative size-[14px] rounded-full border-2 border-plum-950 transition-colors",
                        on ? "bg-rust-bright" : "bg-linen group-hover:bg-rust-bright",
                      )}
                    />
                    <span className={cn("font-serif text-lg italic transition-colors", on ? "text-linen" : "text-cement-light group-hover:text-linen")}>
                      {year(ch.start)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cement-light">
          <span>Languages: {profile.languages.join(" · ")}</span>
          <a href={profile.resume} download className="inline-flex min-h-11 items-center gap-2 text-linen underline-offset-4 hover:underline">
            <Download size={15} /> Download resume
          </a>
        </div>
      </div>
    </section>
  );
}
