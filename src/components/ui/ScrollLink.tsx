"use client";

import { ArrowDownRight } from "lucide-react";
import { scrollToTarget } from "@/components/layout/SmoothScroll";

type Props = { href: `#${string}`; children: React.ReactNode; className?: string; primary?: boolean };

// In-page anchor that uses the shared smooth scroller. `primary` renders the pill CTA.
export default function ScrollLink({ href, children, className, primary }: Props) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget(href);
    history.replaceState(null, "", href);
  };
  if (primary) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-rust py-2 pr-2 pl-6 text-sm font-medium text-linen transition-colors duration-300 fine:hover:bg-rust-deep"
      >
        {children}
        <span className="grid size-8 place-items-center rounded-full bg-linen text-rust transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-focus-visible:rotate-45">
          <ArrowDownRight size={16} />
        </span>
      </a>
    );
  }
  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
