"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type Values = { name: string; email: string; topic: string; message: string };

const topics = ["Website", "Web app or dashboard", "eCommerce", "UI/UX design", "Something else"];

// shortcut: no backend (portfolio has no server or DB), so a valid form opens the visitor's mail app
// with the message prefilled. Swap onSubmit for a form service or route handler if inbox delivery is needed.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues: { topic: topics[0] } });

  const onSubmit = (v: Values) => {
    const subject = `${v.topic} enquiry from ${v.name.trim()}`;
    const body = `${v.message.trim()}\n\n${v.name.trim()}\n${v.email.trim()}`;
    window.location.assign(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSent(true);
    reset();
  };

  const field =
    "w-full rounded-xl border bg-plum-900/25 px-4 py-3.5 text-linen placeholder:text-linen/50 outline-none transition-colors focus:border-linen focus:bg-plum-900/40";

  return (
    <div className="relative rounded-3xl border border-linen/20 bg-rust-deep/40 p-6 backdrop-blur md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex min-h-[26rem] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 size={36} aria-hidden />
            <h3 className="display mt-6 text-4xl">Almost there</h3>
            <p className="mt-4 max-w-sm leading-relaxed text-linen">
              Your email app should now be open with the message ready. Press send there and it reaches me directly. If nothing opened, write to{" "}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                {profile.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-8 min-h-11 text-sm underline underline-offset-4">
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className="mb-2 block text-sm">
                  Name
                </label>
                <input
                  id="cf-name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "cf-name-err" : undefined}
                  className={cn(field, errors.name ? "border-linen" : "border-linen/25")}
                  placeholder="Your name"
                  {...register("name", { required: "Please enter your name", maxLength: { value: 80, message: "Keep it under 80 characters" } })}
                />
                {errors.name && (
                  <p id="cf-name-err" className="mt-2 text-sm font-medium text-linen">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-2 block text-sm">
                  Email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cf-email-err" : undefined}
                  className={cn(field, errors.email ? "border-linen" : "border-linen/25")}
                  placeholder="you@company.com"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "That email doesn't look right" },
                  })}
                />
                {errors.email && (
                  <p id="cf-email-err" className="mt-2 text-sm font-medium text-linen">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm">What is it about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" value={t} className="peer sr-only" {...register("topic")} />
                    <span className="inline-flex min-h-10 items-center rounded-full border border-linen/30 px-4 text-sm transition-colors peer-checked:border-linen peer-checked:bg-linen peer-checked:text-rust peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-linen">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="cf-message" className="mb-2 block text-sm">
                Message
              </label>
              <textarea
                id="cf-message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-err" : undefined}
                className={cn(field, "resize-y", errors.message ? "border-linen" : "border-linen/25")}
                placeholder="A few lines about the project, timeline and goals"
                {...register("message", {
                  required: "Please add a short message",
                  minLength: { value: 20, message: "A little more detail, at least 20 characters" },
                  maxLength: { value: 2000, message: "Keep it under 2000 characters" },
                })}
              />
              {errors.message && (
                <p id="cf-message-err" className="mt-2 text-sm font-medium text-linen">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-2 inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-linen py-2 pr-2 pl-7 font-medium text-rust transition-colors fine:hover:bg-white disabled:opacity-60"
            >
              Send message
              <span className="grid size-10 place-items-center rounded-full bg-rust text-linen transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </button>
            <p className="text-xs text-linen">Opens your email app with the message ready to send. No data is stored on this site.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
