"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { GITHUB_URL } from "@/lib/constants";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js Background */}
      <HeroScene />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 w-full">
        {/* Left-aligned content, full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-1.5 text-xs font-medium text-forest-700 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
            Open Source · GPL-3.0
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 leading-[1.08]">
            Your Linux System,{" "}
            <span className="text-forest-600">Always Healthy</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl text-ink-400 leading-relaxed max-w-lg"
          >
            Professional maintenance, health monitoring, and security auditing
            for Pardus and Debian-based Linux distributions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#install"
              className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-7 py-3 text-sm font-semibold text-white hover:bg-forest-700 transition-colors duration-200 shadow-lg shadow-forest-600/20"
            >
              <ArrowDown className="h-4 w-4" />
              Install Now
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-surface-300 bg-surface-0 px-7 py-3 text-sm font-semibold text-ink-700 hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              View Source
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
