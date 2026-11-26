"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { education, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// The resume "loads" as you scroll: the line draws, each milestone lights up and its content arrives in order.
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const timeline = q("[data-timeline]")[0];
      const pct = q("[data-pct]")[0];
      const bar = q("[data-bar]")[0];
      const navItems = q("[data-nav-item]");
      // Server HTML shows the finished state; reset it here so the sequence can play.
      [...q("[data-milestone]"), ...navItems].forEach((n) => n.removeAttribute("data-on"));
      pct.textContent = "000";
      gsap.set(bar, { scaleX: 0 });

      gsap.fromTo(
        q("[data-fill]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.4,
            onUpdate: (self) => {
              pct.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
              gsap.set(bar, { scaleX: self.progress });
            },
          },
        },
      );

      q("[data-milestone]").forEach((m, i) => {
        const el = gsap.utils.selector(m);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: m,
            start: "top 70%",
            once: true,
            onEnter: () => {
              m.setAttribute("data-on", "true");
              navItems.forEach((n, j) => n.toggleAttribute("data-on", j <= i));
            },
          },
        });
        tl.from(el("[data-head]"), { y: 40, opacity: 0, duration: 0.8, ease: "expo.out" })
          .from(el("[data-summary]"), { y: 20, opacity: 0, duration: 0.6, ease: "expo.out" }, "-=0.55")
          .from(el("[data-item]"), { x: -16, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.4")
          .from(el("[data-tag]"), { scale: 0.6, opacity: 0, duration: 0.4, stagger: 0.035, ease: "back.out(2)" }, "-=0.3")
          .from(el("[data-project]"), { y: 16, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.3");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="journey" aria-labelledby="journey-title" className="section">
      <div className="shell">
        <SectionHeading
          id="journey-title"
          title={
            <>
              The résumé, <span className="serif-accent text-rust-bright">loading line by line</span>
            </>
          }
          lead="From a WordPress internship to architecting the frontend of a telecom SaaS platform. Keep scrolling and the full record loads in."
        />

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          {/* Sticky loader readout */}
          <aside className="md:col-span-4">
            <div className="rounded-2xl border border-linen/10 bg-plum-850/60 p-6 md:sticky md:top-28">
              <div className="flex items-center justify-between font-mono text-xs text-cement-light">
                <span>resume.pdf</span>
                <span>
                  <span data-pct className="text-rust-bright">100</span>%
                </span>
              </div>
              <div className="mt-3 h-px overflow-hidden bg-linen/10">
                <div data-bar className="h-full origin-left bg-rust-bright" />
              </div>
              <ol className="mt-6 space-y-4">
                {experience.map((r) => (
                  <li
                    key={r.company}
                    data-nav-item
                    data-on
                    className="group flex items-start gap-3 text-sm text-cement transition-colors duration-500 data-[on]:text-linen"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-full border border-cement transition-colors duration-500 group-data-[on]:border-rust-bright group-data-[on]:bg-rust-bright" />
                    <span>
                      <span className="block font-medium">{r.company}</span>
                      <span className="font-mono text-[0.7rem] text-cement-light">{r.period}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <a
                href={profile.resume}
                download
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-linen-dim underline-offset-4 hover:text-linen hover:underline"
              >
                <Download size={15} /> Download the full PDF
              </a>
            </div>
          </aside>

          {/* Timeline */}
          <ol data-timeline className="relative md:col-span-8">
            <span aria-hidden className="absolute top-2 bottom-0 left-[7px] w-px bg-linen/10" />
            <span aria-hidden data-fill className="absolute top-2 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-rust-bright via-rust-bright to-maple" />

            {experience.map((r) => (
              <li key={r.company} data-milestone data-on className="group relative pb-20 pl-12 last:pb-12 md:pl-16">
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-linen/30 bg-plum-900 transition-colors duration-500 group-data-[on]:border-rust-bright"
                >
                  <span className="size-[7px] scale-0 rounded-full bg-rust-bright transition-transform duration-500 group-data-[on]:scale-100" />
                </span>

                <div data-head>
                  <p className="font-mono text-xs tracking-wider text-rust-bright">
                    {r.period} · {r.location}
                  </p>
                  <h3 className="display-md mt-3">{r.role}</h3>
                  <p className="mt-2 text-lg text-linen-dim">
                    at <span className="serif-accent text-2xl text-linen">{r.company}</span>
                  </p>
                </div>

                <p data-summary className="mt-6 max-w-2xl leading-relaxed text-linen-dim">
                  {r.summary}
                </p>

                <ul className="mt-6 max-w-2xl space-y-3">
                  {r.responsibilities.map((x) => (
                    <li key={x} data-item className="flex gap-3 text-[0.95rem] leading-relaxed text-cement-light">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-rust-bright" />
                      {x}
                    </li>
                  ))}
                </ul>

                <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
                  {r.stack.map((t) => (
                    <li key={t} data-tag className="tag">
                      {t}
                    </li>
                  ))}
                </ul>

                {r.projects.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow">Project highlights</p>
                    <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-linen/10 bg-linen/10 sm:grid-cols-2">
                      {r.projects.map((p) => {
                        const inner = (
                          <>
                            <span className="flex items-center justify-between gap-2 font-medium text-linen">
                              {p.name}
                              {p.slug && <ArrowUpRight size={15} className="text-rust-bright transition-transform group-hover/p:translate-x-0.5 group-hover/p:-translate-y-0.5" />}
                            </span>
                            <span className="mt-1 block text-sm text-cement-light">{p.note}</span>
                          </>
                        );
                        return (
                          <li key={p.name} data-project className="bg-plum-900">
                            {p.slug ? (
                              <Link href={`/projects/${p.slug}`} className="group/p block h-full p-4 transition-colors fine:hover:bg-plum-850">
                                {inner}
                              </Link>
                            ) : (
                              <div className="h-full p-4">{inner}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            ))}

            <li data-milestone data-on className="group relative pl-12 md:pl-16">
              <span aria-hidden className="absolute top-1.5 left-0 size-[15px] rounded-full border border-maple bg-plum-900" />
              <div data-head>
                <p className="font-mono text-xs tracking-wider text-maple">
                  {education[0].period} · Where it started
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{education[0].degree}</h3>
                <p className="mt-1 text-linen-dim">{education[0].school}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
