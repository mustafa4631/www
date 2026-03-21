"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== displayPath) {
      setIsAnimating(true);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <>
          {/* Phase 1: Dark overlay slides DOWN covering screen */}
          <motion.div
            key={`overlay-${pathname}`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "linear-gradient(135deg, #0a1409 0%, #0d1a14 50%, #061009 100%)",
              transformOrigin: "top",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, transformOrigin: "top" }}
            exit={{ scaleY: 0, transformOrigin: "bottom" }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={(definition) => {
              if (definition === "animate") {
                setDisplayPath(pathname);
                setTimeout(() => setIsAnimating(false), 100);
              }
            }}
          >
            {/* GK Healter logo/wordmark shown during transition */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{
                color: "#3dd68c",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: "var(--font-display)",
              }}
            >
              GK Healter
            </motion.div>

            {/* Animated green scan line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "48%",
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, #3dd68c, #1a6b4a, transparent)",
                transformOrigin: "left",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
