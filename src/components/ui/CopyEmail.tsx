"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("done");
    } catch {
      setState("fail");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-linen/30 px-3 text-xs transition-colors fine:hover:bg-linen fine:hover:text-rust"
    >
      {state === "done" ? <Check size={13} /> : <Copy size={13} />}
      <span aria-live="polite">{state === "done" ? "Copied" : state === "fail" ? "Copy failed" : "Copy"}</span>
    </button>
  );
}
