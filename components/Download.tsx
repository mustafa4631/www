"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download as DownloadIcon, 
  ExternalLink,
  Github
} from "lucide-react";

export default function Download() {
  const [showParticles, setShowParticles] = useState(false);

  const handleDownloadClick = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1000);
    // In a real app, this would trigger the actual download
    window.open("https://github.com/GK-Developers/GK-Healter/releases", "_blank");
  };

  const platforms = [
    { name: "Pardus", badge: "Debian-based" },
    { name: "Debian", badge: "Sid/Stable" },
    { name: "Ubuntu", badge: "22.04+" },
    { name: "Flatpak", badge: "Universal" },
    { name: "Arch", badge: "AUR" },
    { name: "RPM", badge: "Fedora" }
  ];

  return (
    <section id="download" className="section-spacing section-container overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-strong p-12 md:p-24 rounded-[48px] border-primary/20 relative overflow-hidden text-center flex flex-col items-center gap-8"
      >
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] animate-glow-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(138,43,226,0.4)] mb-4"
          >
             <DownloadIcon size={40} className="text-bg-deep" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Ready for a cleaner system?
          </h2>
          <p className="text-xl text-text-muted max-w-2xl">
            Always free. Always open. No signups, no paywalls, just pure system health.
            <span className="block mt-2 text-sm text-text-dim">(Her zaman ücretsiz. Her zaman açık.)</span>
          </p>
        </div>

        <div className="relative z-10">
          <button 
            onClick={handleDownloadClick}
            className="btn-glow text-xl px-12 py-5 group relative"
          >
            <span>Download for Linux</span>
            <div className="ripple"></div>
            
            {/* Particle Burst Animation */}
            <AnimatePresence>
              {showParticles && [...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 1.5, 0], 
                    x: Math.random() * 200 - 100, 
                    y: Math.random() * 200 - 100,
                    opacity: 0
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white pointer-events-none"
                />
              ))}
            </AnimatePresence>
          </button>
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
           {platforms.map((p, i) => (
             <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                <span className="text-sm font-bold text-white">{p.name}</span>
                <span className="text-[10px] text-text-dim uppercase tracking-widest">{p.badge}</span>
             </div>
           ))}
        </div>

        <div className="relative z-10 flex items-center gap-4 mt-8">
           <a 
             href="https://github.com/GK-Developers/GK-Healter/releases" 
             className="text-text-muted hover:text-primary flex items-center gap-2 font-display text-sm transition-colors"
           >
             <ExternalLink size={16} />
             <span>Release Notes</span>
           </a>
           <div className="w-[1px] h-4 bg-white/10" />
           <a 
             href="https://github.com/GK-Developers/GK-Healter" 
             className="text-text-muted hover:text-primary flex items-center gap-2 font-display text-sm transition-colors"
           >
             <Github size={16} />
             <span>Source Code</span>
           </a>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 p-8 text-primary/10 opacity-20">
           <DownloadIcon size={200} />
        </div>
      </motion.div>
    </section>
  );
}
