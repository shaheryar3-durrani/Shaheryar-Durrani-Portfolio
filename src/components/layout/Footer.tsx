"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import Monogram from "@/components/ui/Monogram";
import { CurrentYear } from "@/components/ui/Years";
import { scrollToTarget } from "@/components/layout/SmoothScroll";

export default function Footer() {
  return (
    <footer className="border-t border-linen/10 bg-plum-950">
      <div className="shell flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <Monogram className="text-3xl" />
          <p className="text-sm text-cement-light">
            {profile.name} · {profile.title} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cement-light">
            {navItems.slice(1).map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} className="transition-colors fine:hover:text-linen">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className="transition-colors fine:hover:text-linen">
                Email
              </a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors fine:hover:text-linen">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group inline-flex min-h-11 items-center gap-3 self-start text-sm text-linen-dim md:self-auto"
        >
          Back to top
          <span className="grid size-11 place-items-center rounded-full border border-linen/20 transition-colors group-hover:border-rust-bright group-hover:bg-rust">
            <ArrowUp size={16} className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
      <div className="shell flex flex-col justify-between gap-2 border-t border-linen/5 py-6 font-mono text-[0.7rem] tracking-wider text-cement uppercase sm:flex-row">
        <p>
          © <CurrentYear /> {profile.name}
        </p>
        <p>Designed and built by hand, {profile.location}</p>
      </div>
    </footer>
  );
}
