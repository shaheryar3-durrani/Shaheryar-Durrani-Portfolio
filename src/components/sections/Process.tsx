"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Mirrors how Orinas and the other client builds were actually delivered.
const steps = [
  { title: "Requirements", body: "Sit with stakeholders to define scope, users and site structure." },
  { title: "Wireframes", body: "Low and high fidelity wireframes in Figma to settle layout and flow." },
  { title: "Visual design", body: "Photoshop and Figma mockups for branding and final page layouts." },
  { title: "Build", body: "Pixel-perfect HTML prototypes or Vue.js 3 components from the mockups." },
  { title: "Integrate", body: "WordPress themes and plugins, WooCommerce, or REST APIs wired in." },
  { title: "Optimise", body: "Performance, SEO structure and cross-browser, cross-device testing." },
  { title: "Launch", body: "Deploy, then hand over a CMS the client can run themselves." },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      gsap.fromTo(
        q("[data-rail]"),
        desktop ? { scaleX: 0 } : { scaleY: 0 },
        {
          ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
          ease: "none",
          scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 75%", end: desktop ? "top 30%" : "bottom 60%", scrub: 0.5 },
        },
      );
      gsap.from(q("[data-step]"), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="section">
      <div className="shell">
        <SectionHeading
          id="process-title"
          title={
            <>
              From brief <span className="serif-accent text-rust-bright">to launch</span>
            </>
          }
          lead="The same seven steps run through every client build, from corporate sites to SaaS dashboards."
        />

        <div className="relative mt-20 md:mt-28" data-steps>
          <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-px bg-linen/10 lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          <span
            aria-hidden
            data-rail
            className="absolute top-0 bottom-0 left-[11px] w-px origin-top bg-rust-bright lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full lg:origin-left"
          />
          <ol className="grid gap-10 lg:grid-cols-7 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} data-step className="relative pl-12 lg:pt-12 lg:pl-0">
                <span className="absolute top-0 left-0 grid size-[23px] place-items-center rounded-full border border-rust-bright bg-plum-900 font-mono text-[0.6rem] text-rust-bright">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cement-light">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
