"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function ReadingProgress() {
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const renderClient = () => {
      setMounted(true);
    };
    renderClient();
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ scaleX }}
      aria-valuenow={scaleX.get() * 100}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed left-0 top-14 z-50 h-0.5 w-full origin-left bg-primary"
    />
  );
}
