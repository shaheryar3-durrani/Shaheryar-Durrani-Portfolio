"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Skip the entrance on the very first page load (the loader covers that); animate client navigations.
let navigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => navigated && !reduce);
  useEffect(() => {
    navigated = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
