import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";

// SMSD wordmark: wide display letters with a Rust full stop. Quiet enough to sit beside content.
export default function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn("display inline-flex items-baseline text-[1.35rem] leading-none", className)} aria-hidden>
      {profile.initials}
      <span className="ml-0.5 inline-block size-[0.28em] rounded-full bg-rust-bright" />
    </span>
  );
}
