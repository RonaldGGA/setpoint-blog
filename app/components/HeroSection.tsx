"use client";

import { motion, Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function HeroSection() {
  return (
    <div className="mb-12">
      <motion.h1
        custom={0}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="font-display text-4xl font-bold text-[var(--color-text-primary)]"
      >
        Setpoint
      </motion.h1>

      <motion.p
        custom={1}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="mt-3 text-[var(--color-text-muted)]"
      >
        Technical publishing for Industry 4.0 — SCADA, PLCs, IIoT, and modern
        software.
      </motion.p>
    </div>
  );
}
