"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Download, Terminal, Shield, Zap, Heart } from "lucide-react";
import HealthArc from "./HealthArc";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8 md:gap-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-dim border border-primary/20 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-display font-bold text-primary tracking-wider uppercase">
              v0.1.6 — Now Available
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
            Keep your computer <br />
            <span className="text-primary italic">happy</span> and <span className="text-health">healthy</span> 🌿
          </h1>

          <p className="text-lg text-text-muted max-w-xl font-body">
            GK Healter is a free, open-source Linux utility designed to keep your Pardus or Debian-based system running at peak performance. 
            <span className="block mt-2 text-sm text-text-dim">
              (Bilgisayarınızı mutlu ve sağlıklı tutun.)
            </span>
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button className="btn-glow group">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Free</span>
              <div className="ripple"></div>
            </button>
            <a 
              href="https://github.com/GK-Developers/GK-Healter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost group"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>

          <div className="flex items-center gap-8 mt-8 border-t border-white/5 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display text-white">Free</span>
              <span className="text-xs font-display uppercase tracking-widest text-text-dim">Forever</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display text-white">GPL v3</span>
              <span className="text-xs font-display uppercase tracking-widest text-text-dim">Licensed</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display text-white">Debian+</span>
              <span className="text-xs font-display uppercase tracking-widest text-text-dim">Compatibility</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Main Visual: Health Arc */}
          <div className="relative z-20 glass-strong p-12 rounded-[40px] border-primary/20 shadow-2xl animate-float-bob">
            <HealthArc score={94} size={280} strokeWidth={20} />
            
            {/* Status Overlays */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -right-8 top-12 glass p-4 rounded-2xl flex items-center gap-3 border-health/20"
            >
              <div className="p-2 rounded-lg bg-health/10">
                <Shield className="w-5 h-5 text-health" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-muted">Security</div>
                <div className="text-sm font-bold font-display text-white">VERIFIED</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -left-12 bottom-12 glass p-4 rounded-2xl flex items-center gap-3 border-primary/20"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-muted">Performance</div>
                <div className="text-sm font-bold font-display text-white">OPTIMIZED</div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Rings */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] border border-primary/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[500px] h-[500px] border border-violet/5 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute w-[320px] h-[320px] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Background Icon Watermark */}
      <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none transform translate-x-1/4 translate-y-1/4 select-none">
        <Heart size={800} />
      </div>

    </section>
  );
}
