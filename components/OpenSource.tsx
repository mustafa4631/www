"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Code, GitPullRequest, MessageSquare, Terminal } from "lucide-react";

export default function OpenSource() {
  return (
    <section id="open-source" className="section-spacing section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Content */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-dim border border-violet/20">
              <Code className="text-violet w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold text-violet tracking-[0.2em] uppercase">
              Transparency by Design
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Built by the community, <br />
            for the community.
          </h2>

          <p className="text-lg text-text-muted font-body">
            GK Healter is licensed under GNU GPL v3. We believe in software that belongs to the users, 
            not corporations. No hidden trackers, no "Pro" versions, just honest software.
            <span className="block mt-2 text-sm text-text-dim">(Topluluk tarafından, topluluk için geliştirildi.)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
             <div className="flex items-start gap-5 p-6 md:p-8 rounded-[24px] bg-white/5 border border-white/5 hover:border-violet/30 transition-colors group">
                <GitPullRequest className="text-text-dim group-hover:text-violet transition-colors mt-1" size={20} />
                <div>
                   <h4 className="font-bold text-white text-sm">Contribute</h4>
                   <p className="text-xs text-text-dim">Help us catch bugs or add new features on GitHub.</p>
                </div>
             </div>
             <div className="flex items-start gap-5 p-6 md:p-8 rounded-[24px] bg-white/5 border border-white/5 hover:border-violet/30 transition-colors group">
                <MessageSquare className="text-text-dim group-hover:text-violet transition-colors mt-1" size={20} />
                <div>
                   <h4 className="font-bold text-white text-sm">Feedback</h4>
                   <p className="text-xs text-text-dim">Join our issue tracker to suggest improvements.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Visual Terminal Aesthetic */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-strong overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-critical/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
                 <div className="w-2.5 h-2.5 rounded-full bg-health/50" />
              </div>
              <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest">
                gk-healter --license
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-8 font-mono text-xs md:text-sm leading-relaxed text-text-muted">
               <div className="flex gap-3 mb-4">
                  <span className="text-health">$</span>
                  <span>cat LICENSE | grep "GNU GPL"</span>
               </div>
               <div className="pl-6 border-l border-white/5 py-4 my-4 bg-white/[0.02]">
                 <span className="text-white">GNU GENERAL PUBLIC LICENSE</span><br />
                 Version 3, 29 June 2007<br /><br />
                 Copyright (C) 2007 Free Software Foundation, Inc.<br />
                 Everyone is permitted to copy and distribute verbatim copies<br />
                 of this license document, but changing it is not allowed.
               </div>
               <div className="flex gap-3">
                  <span className="text-health">$</span>
                  <span className="animate-pulse">_</span>
               </div>
            </div>
          </div>

          {/* Decorative floating heart */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-critical/10 border border-critical/20 flex items-center gap-2"
          >
             <Heart className="text-critical fill-critical/20" size={16} />
             <span className="text-[10px] font-display font-bold text-critical uppercase tracking-widest">
               Made with love
             </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
