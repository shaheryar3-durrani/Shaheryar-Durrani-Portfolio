import { cn } from "@/lib/cn";

// Minimal browser chrome around a screenshot, with the palette's three dots.
export default function BrowserFrame({ children, url, className }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-linen/10 bg-plum-800 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-linen/5 px-4">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-rust" />
          <i className="size-2 rounded-full bg-maple" />
          <i className="size-2 rounded-full bg-avocado" />
        </span>
        {url && <span className="mx-auto truncate rounded-full bg-plum-900/70 px-4 py-0.5 font-mono text-[0.65rem] text-cement-light">{url}</span>}
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
