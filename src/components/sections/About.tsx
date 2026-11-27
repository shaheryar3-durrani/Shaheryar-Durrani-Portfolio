import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import TextReveal from "@/components/animations/TextReveal";
import Parallax from "@/components/animations/Parallax";
import Reveal from "@/components/animations/Reveal";
import Portrait from "@/components/sections/Portrait";
import { YearsOfExperience } from "@/components/ui/Years";

const marquee = ["Vue.js 3", "WordPress", "WooCommerce", "Figma", "Core PHP", "REST APIs", "Photoshop", "SCSS", "Bootstrap", "Vuetify"];

const pillars = [
  {
    title: "Background",
    body: "Computer science graduate from the University of Abbottabad. I started with WordPress at NovaTech, grew into full-stack PHP at Green Origin, and now build frontends at HoboeTech in Lahore.",
  },
  {
    title: "Approach",
    body: "Requirements first, then wireframes, then mockups, then code. Every build starts from a clear structure, so the interface stays simple even when the system behind it, like six telecom portals in one dashboard, is not.",
  },
  {
    title: "What sets it apart",
    body: "I design what I build. Owning both the mockup and the implementation closes the handoff gap, and performance is part of the design: rendering time down about 60% on Khudii, load time down up to 50% on PolarCream.",
  },
];

export default function About() {
  const stats = [
    { value: <><YearsOfExperience />+</>, label: "Years professional", position: "top-8 right-3 md:-right-8", depth: 120 },
    { value: projects.length, label: "Projects here", position: "top-[44%] left-3 md:-left-10", depth: 200 },
    { value: experience.length, label: "Teams", position: "bottom-28 right-3 md:-right-4", depth: 80 },
  ];
  return (
    <section id="about" aria-labelledby="about-title" className="section overflow-hidden">
      {/* Tech marquee */}
      <div aria-hidden className="absolute inset-x-0 top-0 overflow-hidden border-y border-linen/10 py-4">
        <div className="flex w-max animate-marquee gap-12 font-mono text-xs tracking-[0.2em] text-cement uppercase">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="size-1 rounded-full bg-rust-bright" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell pt-12">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-12">
          <figure className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
            <Portrait src="/about/portrait.webp" width={776} height={970} alt={`Portrait of ${profile.name}`} />

            {/* Stats float on the portrait at different depths */}
            <dl>
              {stats.map((st, i) => (
                <Parallax key={st.label} y={st.depth} className={`absolute z-10 ${st.position}`}>
                  <Reveal delay={0.2 + i * 0.1}>
                    <div className="rounded-2xl border border-linen/15 bg-plum-900/75 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                      <dd className={`display text-3xl md:text-4xl ${i === 0 ? "text-rust-bright" : ""}`}>{st.value}</dd>
                      <dt className="eyebrow mt-1 text-[0.6rem]">{st.label}</dt>
                    </div>
                  </Reveal>
                </Parallax>
              ))}
            </dl>

            {/* Rotating badge */}
            <svg
              aria-hidden
              viewBox="0 0 120 120"
              className="absolute -bottom-4 -left-2 z-10 size-28 animate-[spin_22s_linear_infinite] md:-left-6 md:size-32"
            >
              <defs>
                <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <circle cx="60" cy="60" r="58" className="fill-plum-900/80 stroke-linen/15" strokeWidth="1" />
              <text className="fill-linen font-mono text-[9.5px] tracking-[0.32em] uppercase">
                <textPath href="#badge-circle">{`${profile.tagline} · ${profile.initials} · `}</textPath>
              </text>
              <circle cx="60" cy="60" r="5" className="fill-rust-bright" />
            </svg>
            <figcaption className="mt-6 flex items-baseline justify-between gap-4 border-t border-linen/10 pt-4 pl-28 md:pl-32">
              <span className="text-sm font-medium">{profile.name}</span>
              <span className="shrink-0 font-mono text-xs text-cement-light">{profile.location}</span>
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <Reveal>
              <h2 id="about-title" className="display-lg">
                About <span className="serif-accent text-rust-bright">me</span>
              </h2>
            </Reveal>
            <TextReveal
              className="mt-8 max-w-2xl text-lg leading-relaxed text-linen md:text-xl"
              text="I sit between design and engineering. I turn Figma and Photoshop prototypes into pixel-perfect, responsive interfaces, and back them with the Vue.js, PHP and WordPress work that makes them fast."
            />
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} className="border-t border-linen/15 pt-5">
                  <h3 className="font-mono text-[0.7rem] tracking-[0.16em] text-rust-bright uppercase">
                    0{i + 1} / {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-linen-dim">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
