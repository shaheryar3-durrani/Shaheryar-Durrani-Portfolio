"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import Monogram from "@/components/ui/Monogram";
import { scrollToTarget } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: whichever nav section crosses the upper-middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    scrollToTarget(id === "home" ? 0 : `#${id}`);
    history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open ? "border-b border-linen/10 bg-plum-900/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="shell flex h-18 items-center justify-between gap-6">
        <Link href="/" onClick={go("home")} className="flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <Monogram />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const current = isHome && active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.id === "home" ? "/" : `/#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    current ? "text-linen" : "text-cement-light fine:hover:text-linen",
                  )}
                >
                  {current && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-linen/8"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.gmailHref}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-rust px-5 text-sm font-medium text-linen transition-colors fine:hover:bg-rust-deep sm:inline-flex"
          >
            <span className="size-1.5 animate-pulse-dot rounded-full bg-linen" aria-hidden />
            Let&apos;s talk
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-linen/15 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="shell flex flex-col gap-2 pt-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.id === "home" ? "/" : `/#${item.id}`}
                    onClick={go(item.id)}
                    className="display flex items-baseline gap-4 py-2 text-5xl"
                  >
                    <span className="font-mono text-xs font-normal text-rust-bright">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="shell mt-10 border-t border-linen/10 pt-6">
              <a href={`mailto:${profile.email}`} className="text-sm text-linen-dim underline-offset-4 hover:underline">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
