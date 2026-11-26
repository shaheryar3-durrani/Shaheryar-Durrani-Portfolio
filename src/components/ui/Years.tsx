"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

// Date reads are not allowed during prerender (Cache Components), so the server snapshot uses the
// resume's stated figure and the browser computes the live value after hydration.
const noop = () => () => {};

const yearsSince = (iso: string) => {
  const start = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) years--;
  return years;
};

export function YearsOfExperience() {
  const years = useSyncExternalStore(noop, () => yearsSince(profile.careerStart), () => profile.resumeYears);
  return <>{years}</>;
}

export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <>{year}</>;
}
