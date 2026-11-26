import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import HeroVisual from "@/components/3d/HeroVisual";
import Button from "@/components/ui/Button";
import ScrollLink from "@/components/ui/ScrollLink";
import { YearsOfExperience } from "@/components/ui/Years";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col overflow-hidden pt-28">
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] -bottom-[30%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(159,85,60,0.35),transparent)]" />
        <div className="absolute -top-[20%] -left-[15%] size-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgba(178,151,98,0.12),transparent)]" />
      </div>

      <div className="shell relative flex flex-1 flex-col">
        <div className="relative z-10 flex flex-1 flex-col justify-center py-10 md:max-w-[62%]">
          <p className="eyebrow hero-fade flex items-center gap-3 [--d:0ms]">
            <span className="size-1.5 rounded-full bg-rust-bright" aria-hidden />
            {profile.title} · {profile.discipline}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[length:clamp(var(--text-step-4),8vw,var(--text-step-6))]">
            <span className="hero-line">
              <span className="hero-rise serif-accent text-[0.6em] whitespace-nowrap text-rust-bright [--d:60ms]">Shahzada Muhammad</span>
            </span>
            <span className="hero-line">
              <span className="hero-rise [--d:140ms]">Shaheryar</span>
            </span>
            <span className="hero-line">
              <span className="hero-rise [--d:220ms]">Durrani</span>
            </span>
          </h1>

          <p className="lead hero-fade mt-8 max-w-xl [--d:420ms]">{profile.intro}</p>

          <div className="hero-fade mt-10 flex flex-wrap gap-3 [--d:540ms]">
            <ScrollLink href="#work" primary>
              Explore My Work
            </ScrollLink>
            <Button href={profile.resume} variant="ghost" download icon={<Download size={15} />}>
              Download Resume
            </Button>
          </div>
        </div>

        <div className="relative -mx-5 aspect-[4/3] sm:-mx-8 md:absolute md:inset-y-0 md:right-0 md:mx-0 md:aspect-auto md:w-[58%]">
          <HeroVisual />
        </div>

        <dl className="hero-fade relative z-10 grid grid-cols-2 gap-6 border-t border-linen/10 py-6 text-sm md:grid-cols-4 [--d:700ms]">
          <div>
            <dt className="eyebrow">Currently</dt>
            <dd className="mt-1.5 text-linen-dim">Frontend Developer, HoboeTech</dd>
          </div>
          <div>
            <dt className="eyebrow">Based in</dt>
            <dd className="mt-1.5 text-linen-dim">{profile.location}</dd>
          </div>
          <div>
            <dt className="eyebrow">Experience</dt>
            <dd className="mt-1.5 text-linen-dim">
              <YearsOfExperience />+ years professional
            </dd>
          </div>
          <div className="hidden items-end justify-end md:flex">
            <ScrollLink href="#about" className="flex items-center gap-3 text-cement-light">
              <span className="eyebrow">Scroll</span>
              <span className="relative h-10 w-px overflow-hidden bg-linen/15" aria-hidden>
                <span className="absolute inset-0 animate-scroll-cue bg-rust-bright" />
              </span>
            </ScrollLink>
          </div>
        </dl>
      </div>
    </section>
  );
}
