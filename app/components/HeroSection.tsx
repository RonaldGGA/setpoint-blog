"use client";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <div className="mb-10 pt-4">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="flex items-center gap-2 mb-4"
      >
        <span className="h-px w-8 bg-primary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Industry 4.0 × Software
        </span>
      </motion.div>

      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="font-display text-4xl font-bold leading-tight text-text-primary sm:text-5xl"
      >
        Where industrial automation
        <br />
        <span className="text-text-muted font-normal">
          meets modern software.
        </span>
      </motion.h1>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="mt-4 max-w-xl text-text-muted leading-relaxed"
      >
        Technical deep-dives on SCADA, PLCs, IIoT, OPC-UA — written by a
        developer who builds both sides.
      </motion.p>
    </div>
  );
}
