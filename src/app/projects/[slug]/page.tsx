import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getMedia, getProject, projects } from "@/data/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import ScrollTilt from "@/components/animations/ScrollTilt";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const m = getMedia(p.slug);
  return {
    title: `${p.title} · ${p.category}`,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: [{ url: m.cover.src, width: m.cover.w, height: m.cover.h }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const m = getMedia(p.slug);
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const nextMedia = getMedia(next.slug);
  const companions = (p.companions ?? []).map((slug) => getProject(slug)!).filter(Boolean);
  const mobile = m.screens.filter((s) => s.mobile);
  const desktop = m.screens.filter((s) => !s.mobile);

  const meta = [
    p.company && { k: "Company", v: p.company },
    p.role && { k: "Role", v: p.role },
    { k: "Type", v: p.category },
    p.metric && { k: "Result", v: `${p.metric.value} ${p.metric.label}` },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="pt-28">
      {/* Header */}
      <header className="shell pt-10 pb-16 md:pb-24">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-cement-light transition-colors hover:text-linen">
          <ArrowLeft size={16} /> All projects
        </Link>
        <p className="eyebrow mt-10 flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-rust-bright" aria-hidden />
          {p.category}
        </p>
        <h1 className="display mt-5 text-[length:clamp(var(--text-step-4),11vw,var(--text-step-7))]">{p.title}</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="lead md:col-span-7">{p.summary}</p>
          <dl className="grid grid-cols-2 gap-6 text-sm md:col-span-5">
            {meta.map((x) => (
              <div key={x.k} className="border-t border-linen/10 pt-3">
                <dt className="eyebrow">{x.k}</dt>
                <dd className="mt-1.5 text-linen-dim">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {p.live && (
            <Button href={p.live} external>
              Visit live site
            </Button>
          )}
          {companions.map((companion) => {
            const companionMedia = getMedia(companion.slug);
            return (
            <Link
              key={companion.slug}
              href={`/projects/${companion.slug}`}
              className="group inline-flex items-center gap-4 rounded-2xl border border-linen/15 p-2 pr-5 transition-colors fine:hover:border-rust-bright/60"
            >
              <span className="block w-24 overflow-hidden rounded-xl">
                <Image src={companionMedia.thumb.src} width={companionMedia.thumb.w} height={companionMedia.thumb.h} alt="" sizes="96px" className="w-full" />
              </span>
              <span>
                <span className="eyebrow block">Companion case study</span>
                <span className="mt-1 flex items-center gap-2 font-medium">
                  {companion.title}
                  <ArrowUpRight size={15} className="text-rust-bright transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </Link>
            );
          })}
        </div>
      </header>

      {/* Hero media */}
      <div className="shell">
        <ScrollTilt>
          <BrowserFrame url={p.live ? new URL(p.live).host : p.title}>
            <Image src={m.cover.src} width={m.cover.w} height={m.cover.h} alt={`${p.title}: ${p.category}`} sizes="(min-width: 1440px) 1360px, 100vw" className="w-full" loading="eager" fetchPriority="high" />
          </BrowserFrame>
        </ScrollTilt>
      </div>

      {/* Features and contributions */}
      {(p.features || p.contributions) && (
        <section className="shell section grid gap-16 md:grid-cols-2" aria-label="Project details">
          {p.features && (
            <Reveal>
              <h2 className="eyebrow">Key features</h2>
              <ul className="mt-6 space-y-4">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-4 border-b border-linen/10 pb-4 text-lg leading-relaxed text-linen-dim">
                    <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-maple" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {p.contributions && (
            <Reveal delay={0.08}>
              <h2 className="eyebrow">My contributions</h2>
              <ul className="mt-6 space-y-4">
                {p.contributions.map((f) => (
                  <li key={f} className="flex gap-4 border-b border-linen/10 pb-4 text-lg leading-relaxed text-linen-dim">
                    <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-rust-bright" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </section>
      )}

      {/* Full page, scrollable inside the frame */}
      {m.full && (
        <section className={cn("shell", !(p.features || p.contributions) && "pt-24")} aria-labelledby="full-title">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 id="full-title" className="display-md">
              The full <span className="serif-accent text-rust-bright">page</span>
            </h2>
            <p className="hidden font-mono text-xs text-cement-light md:block">Scroll inside the frame</p>
          </div>
          <BrowserFrame url={p.live ? new URL(p.live).host : p.title}>
            <div data-lenis-prevent tabIndex={0} aria-label={`Full page screenshot of ${p.title}, scrollable`} className="h-[75vh] overflow-y-auto overscroll-contain">
              <Image src={m.full.src} width={m.full.w} height={m.full.h} alt={`Full page design of ${p.title}`} unoptimized className="w-full" />
            </div>
          </BrowserFrame>
        </section>
      )}

      {/* Screens */}
      {desktop.length > 0 && (
        <section className="shell section" aria-labelledby="screens-title">
          <h2 id="screens-title" className="display-md">
            Screens <span className="font-mono text-base tracking-normal text-cement-light">({desktop.length})</span>
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {desktop.map((s) => (
              <Reveal as="li" key={s.src}>
                <figure>
                  <div className="max-h-[36rem] overflow-hidden rounded-xl border border-linen/10 bg-plum-800">
                    <Image src={s.src} width={s.w} height={s.h} alt={`${p.title}: ${s.label}`} sizes="(min-width: 768px) 45vw, 100vw" className="w-full" />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-cement-light">{s.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {mobile.length > 0 && (
        <section className="section overflow-hidden" aria-labelledby="app-title">
          <div className="shell">
            <h2 id="app-title" className="display-md">
              App screens <span className="font-mono text-base tracking-normal text-cement-light">({mobile.length})</span>
            </h2>
          </div>
          <ul
            data-lenis-prevent
            tabIndex={0}
            aria-label="App screens, scroll horizontally"
            className="shell mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-color:var(--color-rust)_transparent]"
          >
            {mobile.map((s) => (
              <li key={s.src} className="w-[220px] shrink-0 snap-start sm:w-[260px]">
                <figure>
                  <div className="aspect-[9/19] overflow-hidden rounded-[1.6rem] border border-linen/10 bg-plum-800">
                    <Image src={s.src} width={s.w} height={s.h} alt={`${p.title}: ${s.label}`} sizes="260px" className="size-full object-cover object-top" />
                  </div>
                  <figcaption className="mt-3 truncate font-mono text-xs text-cement-light">{s.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Next project */}
      <nav aria-label="Next project" className="mt-24 border-t border-linen/10">
        <Link href={`/projects/${next.slug}`} data-cursor="view" className="group shell grid items-center gap-8 py-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Next project</p>
            <p className="display mt-4 text-[clamp(3rem,8vw,7.5rem)] transition-colors group-hover:text-rust-bright">
              {next.title}
              <ArrowUpRight className="ml-3 inline size-[0.5em] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" aria-hidden />
            </p>
            <p className="mt-3 text-cement-light">{next.category}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-linen/10 md:col-span-5">
            <Image src={nextMedia.thumb.src} width={nextMedia.thumb.w} height={nextMedia.thumb.h} alt="" sizes="(min-width: 768px) 40vw, 100vw" className="w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
          </div>
        </Link>
      </nav>
    </article>
  );
}
