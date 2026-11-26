"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Every figure below is stated in the resume; the project count is the number of projects on this site.
const metrics = [
  { value: 60, prefix: "~", suffix: "%", label: "Faster page rendering", detail: "Khudii, by eager-loading organisation and donation data in batches." },
  { value: 60, suffix: "%", label: "Faster page loads", detail: "Green Origin website, through client-side rendering and live data integration." },
  { value: 50, prefix: "up to ", suffix: "%", label: "Lower load time", detail: "PolarCream store, with optimised WooCommerce product rendering." },
  { value: 6, label: "Systems, one dashboard", detail: "UCAS unifies CMT Jazz, PBX Telenor, video conferencing, Omni Chat, ticketing and call center." },
];

const milestones = [
  "Built B-RAP from scratch on Vue.js 3",
  "Delivered Orinas end to end for a Japan-based client",
  `${projects.length} projects across web, SaaS and mobile`,
  "Intern in 2021, Frontend Developer by 2023",
];

export default function Achievements() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-count]", root.current).forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="achievements" aria-labelledby="achievements-title" className="section border-t border-linen/10 bg-plum-950/60">
      <div className="shell">
        <SectionHeading
          id="achievements-title"
          title={
            <>
              Results, <span className="serif-accent text-rust-bright">measured</span>
            </>
          }
        />

        <ul className="mt-16 grid border-t border-linen/10 md:mt-24 md:grid-cols-2">
          {metrics.map((m, i) => (
            <li
              key={m.label}
              className={`border-b border-linen/10 py-10 md:py-14 ${i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"}`}
            >
              <p className="display flex items-baseline text-[clamp(4rem,10vw,9rem)] text-linen">
                {m.prefix && <span className="mr-3 self-center font-mono text-xl font-normal tracking-normal text-cement-light">{m.prefix.trim()}</span>}
                <span data-count={m.value}>{m.value}</span>
                {m.suffix && <span className="text-rust-bright">{m.suffix}</span>}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{m.label}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-cement-light">{m.detail}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-14 flex flex-wrap gap-3">
          {milestones.map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-full border border-linen/10 px-5 py-3 text-sm text-linen-dim">
              <span className="size-1.5 rounded-full bg-avocado" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
