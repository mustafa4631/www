"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
}

export default function SectionTransition({
  children,
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.92, 1, 1, 0.96]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const blur = useTransform(scrollYProgress, [0, 0.15], ["8px", "0px"]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        scale,
        opacity,
        filter: blur,
        position: "relative",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
