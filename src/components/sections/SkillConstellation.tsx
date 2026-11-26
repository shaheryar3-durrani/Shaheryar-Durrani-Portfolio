"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SkillGroup } from "@/data/skills";
import { cn } from "@/lib/cn";

const R = 35; // skill ring radius, % of stage
const R_OUTER = 47; // category ring radius
const ease = [0.16, 1, 0.3, 1] as const;

const polar = (i: number, n: number, r: number, offset = -90) => {
  const a = ((offset + (i * 360) / n) * Math.PI) / 180;
  return { x: Math.round((50 + r * Math.cos(a)) * 100) / 100, y: Math.round((50 + r * Math.sin(a)) * 100) / 100 };
};

export default function SkillConstellation({ groups }: { groups: SkillGroup[] }) {
  const [activeId, setActiveId] = useState(groups[0].id);
  const [focus, setFocus] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const group = groups.find((g) => g.id === activeId)!;
  const n = group.skills.length;
  const note = group.skills.find((s) => s.name === focus)?.note ?? group.blurb;

  return (
    <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
      {/* Category list (the accessible control) */}
      <div className="md:col-span-4">
        <ul className="flex flex-wrap gap-2 md:flex-col md:gap-0" aria-label="Skill groups">
          {groups.map((g, i) => {
            const on = g.id === activeId;
            return (
              <li key={g.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setActiveId(g.id);
                    setFocus(null);
                  }}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-full border px-4 py-2.5 text-left transition-colors md:rounded-none md:border-0 md:border-b md:px-0 md:py-5",
                    on ? "border-rust-bright text-linen md:border-linen/15" : "border-linen/15 text-cement-light fine:hover:text-linen",
                  )}
                >
                  <span className={cn("hidden font-mono text-xs md:inline", on ? "text-rust-bright" : "text-cement")}>0{i + 1}</span>
                  <span className="text-sm md:display md:text-2xl">{g.label}</span>
                  <span className="ml-auto hidden font-mono text-xs text-cement md:inline">{g.skills.length}</span>
                  <span
                    className={cn(
                      "hidden size-2 rounded-full transition-colors md:block",
                      on ? "bg-rust-bright" : "bg-transparent",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Constellation stage */}
      <div className="md:col-span-8">
        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" className="text-linen/10" strokeWidth="0.15" strokeDasharray="0.6 1.2" />
            <circle cx="50" cy="50" r={R_OUTER} fill="none" stroke="currentColor" className="text-linen/5" strokeWidth="0.15" />
            {groups.map((g, i) => {
              const p = polar(i, groups.length, R_OUTER, -60);
              const on = g.id === activeId;
              return (
                <g key={g.id}>
                  <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="currentColor" strokeWidth="0.12" className={on ? "text-rust-bright/50" : "text-linen/5"} />
                  <circle cx={p.x} cy={p.y} r={on ? 1.1 : 0.6} className={on ? "fill-rust-bright" : "fill-linen/25"} />
                </g>
              );
            })}
            <AnimatePresence mode="popLayout">
              <motion.g key={activeId}>
                {group.skills.map((s, i) => {
                  const p = polar(i, n, R);
                  const q = polar((i + 1) % n, n, R);
                  const lit = focus === s.name;
                  return (
                    <g key={s.name}>
                      <motion.line
                        x1="50"
                        y1="50"
                        x2={p.x}
                        y2={p.y}
                        stroke="currentColor"
                        strokeWidth={lit ? 0.35 : 0.18}
                        className={lit ? "text-rust-bright" : "text-linen/25"}
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease }}
                      />
                      <motion.line
                        x1={p.x}
                        y1={p.y}
                        x2={q.x}
                        y2={q.y}
                        stroke="currentColor"
                        strokeWidth="0.12"
                        className="text-maple/30"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease }}
                      />
                    </g>
                  );
                })}
              </motion.g>
            </AnimatePresence>
          </svg>

          {/* Hub */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid size-[30%] place-items-center rounded-full border border-rust-bright/40 bg-plum-900 text-center shadow-[0_0_80px_-10px_rgba(159,85,60,0.6)]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeId}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="display px-3 text-[clamp(0.8rem,2vw,1.35rem)] leading-tight"
                >
                  {group.label}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Skill nodes */}
          <ul aria-label={`${group.label} skills`}>
            {group.skills.map((s, i) => {
              const p = polar(i, n, R);
              const lit = focus === s.name;
              return (
                <motion.li
                  key={`${activeId}-${s.name}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  initial={reduce ? { left: `${p.x}%`, top: `${p.y}%` } : { left: "50%", top: "50%", opacity: 0 }}
                  animate={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setFocus(s.name)}
                    onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus(s.name)}
                    onBlur={() => setFocus(null)}
                    onClick={() => setFocus(s.name)}
                    aria-describedby="skill-note"
                    className={cn(
                      "flex min-h-11 max-w-[8.5rem] items-center gap-2 rounded-full border px-3 py-1.5 text-left text-[0.72rem] leading-tight backdrop-blur transition-colors sm:text-xs",
                      lit ? "border-rust-bright bg-rust text-linen" : "border-linen/15 bg-plum-850/80 text-linen-dim",
                    )}
                  >
                    <span className={cn("size-1.5 shrink-0 rounded-full", lit ? "bg-linen" : "bg-rust-bright")} aria-hidden />
                    {s.name}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <p id="skill-note" aria-live="polite" className="mx-auto mt-8 max-w-xl text-center text-linen-dim">
          {focus && <span className="mr-2 font-mono text-xs tracking-wider text-rust-bright uppercase">{focus}</span>}
          {note}
        </p>
      </div>
    </div>
  );
}
