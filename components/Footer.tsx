"use client";

import React from "react";
import { Github, Heart, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-deep pt-16 pb-8">
      <div className="section-container flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Logo & Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
               </div>
               <span className="text-xl font-display font-bold text-white tracking-widest uppercase">
                 GK Healter
               </span>
            </div>
            <p className="text-sm text-text-dim max-w-xs font-body">
              The professional system maintenance utility for Pardus and Debian distributions.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-display font-bold text-text-muted uppercase tracking-[0.2em]">Developers</span>
               <div className="flex flex-col gap-2 text-sm">
                  <span className="text-text-dim hover:text-white transition-colors">Egehan KAHRAMAN</span>
                  <span className="text-text-dim hover:text-white transition-colors">Mustafa GÖKPINAR</span>
               </div>
            </div>
            
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-display font-bold text-text-muted uppercase tracking-[0.2em]">Project</span>
               <div className="flex flex-col gap-2 text-sm">
                  <a href="https://github.com/GK-Developers/GK-Healter" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-primary transition-colors flex items-center gap-2">
                     <Github size={14} />
                     <span>GitHub</span>
                  </a>
                  <a href="#" className="text-text-dim hover:text-primary transition-colors flex items-center gap-2">
                     <Globe size={14} />
                     <span>Wiki</span>
                  </a>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
          <div className="flex items-center gap-2 text-[10px] font-display font-bold text-text-dim uppercase tracking-[0.2em]">
             <span>&copy; {currentYear} GK Developers</span>
             <span className="w-1 h-1 rounded-full bg-white/10" />
             <span>GNU GPL v3</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-dim">
             <span>Made with</span>
             <Heart size={14} className="text-critical fill-critical/20" />
             <span>in Turkey</span>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-health" />
                <span className="text-[10px] font-bold text-health font-display uppercase tracking-wider">Status: Healthy</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
