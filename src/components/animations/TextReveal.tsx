"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = { text: string; className?: string; as?: "p" | "h2" };

// Words brighten from muted to active as the block scrolls through the viewport.
export default function TextReveal({ text, className, as: Tag = "p" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-word]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}&nbsp;
        </span>
      ))}
    </Tag>
  );
}
