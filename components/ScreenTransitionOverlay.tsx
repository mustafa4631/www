"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransitionContext } from "@/context/TransitionContext";

export default function ScreenTransitionOverlay() {
  const { isTransitioning } = useTransitionContext();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="screen-transition"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            pointerEvents: "all",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark base */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0a1409",
            }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, transformOrigin: "top" }}
            exit={{ scaleY: 0, transformOrigin: "bottom" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Aurora glow */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,107,74,0.25) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />

          {/* Scan line */}
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, #3dd68c 30%, #3dd68c 70%, transparent 100%)",
              top: "50%",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeInOut" }}
          />

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            exit={{ opacity: 0, letterSpacing: "0.3em" }}
            transition={{ delay: 0.2, duration: 0.35 }}
            style={{
              position: "relative",
              zIndex: 1,
              color: "#3dd68c",
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
            }}
          >
            GK Healter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
