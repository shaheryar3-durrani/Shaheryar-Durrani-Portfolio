import Image from "next/image";
import Link from "next/link";
import { featuredProjects, getMedia } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import ScrollTilt from "@/components/animations/ScrollTilt";
import { cn } from "@/lib/cn";

const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : undefined);

export default function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section border-t border-linen/10">
      <div className="shell">
        <SectionHeading
          id="work-title"
          title={
            <>
              Selected work, <span className="serif-accent text-rust-bright">shipped for real clients</span>
            </>
          }
          lead="NGO platforms, telecom SaaS, smart-device dashboards and eCommerce. Each one designed and built from the first wireframe."
        />

        <ol className="mt-20 space-y-28 md:mt-32 md:space-y-44">
          {featuredProjects.map((p, i) => {
            const m = getMedia(p.slug);
            const flip = i % 2 === 1;
            return (
              <li key={p.slug} className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                <ScrollTilt flip={flip} className={cn("md:col-span-7", flip && "md:order-2")}>
                  <Link href={`/projects/${p.slug}`} data-cursor="view" className="group block" aria-label={`${p.title} case study`}>
                    <BrowserFrame url={host(p.live) ?? p.title}>
                      <Image
                        src={m.cover.src}
                        width={m.cover.w}
                        height={m.cover.h}
                        alt={`${p.title}: ${p.category}`}
                        sizes="(min-width: 768px) 58vw, 100vw"
                        className="w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                      />
                    </BrowserFrame>
                  </Link>
                </ScrollTilt>

                <div className={cn("md:col-span-5", flip && "md:order-1")}>
                  <Reveal>
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="display mt-3 text-[length:clamp(var(--text-step-3),5vw,var(--text-step-5))] break-words">
                      <Link href={`/projects/${p.slug}`} className="transition-colors fine:hover:text-rust-bright">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-6 leading-relaxed text-linen-dim">{p.summary}</p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-linen/10 pt-6 text-sm">
                      <div>
                        <dt className="eyebrow">Role</dt>
                        <dd className="mt-1.5 text-linen-dim">{p.role}</dd>
                      </div>
                      {p.metric ? (
                        <div>
                          <dt className="eyebrow">Result</dt>
                          <dd className="mt-1.5">
                            <span className="display text-3xl text-rust-bright">{p.metric.value}</span>
                            <span className="mt-1 block text-linen-dim">{p.metric.label}</span>
                          </dd>
                        </div>
                      ) : (
                        <div>
                          <dt className="eyebrow">Company</dt>
                          <dd className="mt-1.5 text-linen-dim">{p.company}</dd>
                        </div>
                      )}
                    </dl>
                    <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
                      {p.stack.slice(0, 5).map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Button href={`/projects/${p.slug}`} variant="ghost" className="mt-8">
                      View case study
                    </Button>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
