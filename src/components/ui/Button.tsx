import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark";
  icon?: React.ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const styles = {
  primary: "bg-rust text-linen fine:hover:bg-rust-deep",
  ghost: "border border-linen/20 text-linen fine:hover:border-linen/50 fine:hover:bg-linen/5",
  light: "bg-linen text-plum-700 fine:hover:bg-white",
  dark: "bg-plum-700 text-linen fine:hover:bg-plum-900",
};

// Pill button; the arrow chip swaps on hover/focus.
export default function Button({ href, children, variant = "primary", icon, className, download, external, onClick }: Props) {
  const cls = cn(
    "group inline-flex min-h-12 items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-medium transition-[background-color,border-color,color] duration-300",
    styles[variant],
    className,
  );
  const chip = (
    <span
      className={cn(
        "relative grid size-8 place-items-center overflow-hidden rounded-full",
        variant === "light" ? "bg-plum-700 text-linen" : variant === "primary" ? "bg-linen text-rust" : variant === "dark" ? "bg-linen text-plum-700" : "bg-linen/10",
      )}
    >
      <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-8 group-focus-visible:-translate-y-8">
        {icon ?? <ArrowUpRight size={16} />}
      </span>
      <span className="absolute translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
        {icon ?? <ArrowUpRight size={16} />}
      </span>
    </span>
  );
  if (download || external) {
    return (
      <a href={href} className={cls} onClick={onClick} {...(download ? { download: "" } : { target: "_blank", rel: "noreferrer" })}>
        {children}
        {chip}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
      {chip}
    </Link>
  );
}
