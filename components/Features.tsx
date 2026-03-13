"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Trash2, 
  Settings, 
  FileText, 
  Search, 
  Activity 
} from "lucide-react";

const features = [
  {
    title: "Real-Time Monitoring",
    description: "Get a living health score for your system based on CPU, RAM, and Disk metrics.",
    tr: "CPU, RAM ve Disk ölçümlerine dayalı canlı sağlık puanı alın.",
    icon: <Activity className="w-6 h-6" />,
    color: "var(--color-primary)"
  },
  {
    title: "AI-Assisted Analysis",
    description: "Leverage local intelligence and cloud power (Gemini/Claude) for smart system optimizations.",
    tr: "Akıllı sistem optimizasyonları için yerel zeka ve bulut gücünden faydalanın.",
    icon: <Cpu className="w-6 h-6" />,
    color: "var(--color-violet)"
  },
  {
    title: "Security Scanner",
    description: "Scan for world-writable files, SUID binaries, and potential SSH vulnerabilities.",
    tr: "Dünya tarafından yazılabilir dosyaları, SUID ikili dosyaları ve SSH açıklarını tarayın.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "var(--color-health)"
  },
  {
    title: "Auto-Maintenance",
    description: "Scheduled cleaning tasks that run during idle time without interrupting your work.",
    tr: "Çalışmanızı kesintiye uğratmadan boşta kalma süresinde çalışan bakım görevleri.",
    icon: <Settings className="w-6 h-6" />,
    color: "var(--color-warning)"
  },
  {
    title: "Deep Disk Cleanup",
    description: "Safely remove APT cache, redundant logs, and app junk while preserving critical files.",
    tr: "Kritik dosyaları korurken APT önbelleğini, gereksiz günlükleri ve uygulama çöplerini silin.",
    icon: <Trash2 className="w-6 h-6" />,
    color: "var(--color-critical)"
  },
  {
    title: "Detailed Reporting",
    description: "Export comprehensive system reports in TXT, HTML, or JSON for professional analysis.",
    tr: "Profesyonel analiz için TXT, HTML veya JSON formatında kapsamlı raporlar dışa aktarın.",
    icon: <FileText className="w-6 h-6" />,
    color: "var(--color-primary)"
  }
];

export default function Features() {
  return (
    <section id="features" className="section-spacing section-container">
      <div className="flex flex-col items-center text-center gap-6 mb-24">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-display font-bold text-primary tracking-[0.3em] uppercase"
        >
          Core Capabilities
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
        >
          Designed for a healthier OS.
        </motion.h2>
        <p className="text-text-muted max-w-2xl text-lg">
          GK Healter provides a complete ecosystem of tools to monitor, clean, and secure your Linux environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group glass p-10 rounded-[32px] border-white/5 card-lift relative overflow-hidden"
          >
            {/* Background Accent Glow */}
            <div 
              className="absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ background: feature.color }}
            />

            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
            >
              {feature.icon}
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">
              {feature.title}
            </h3>
            
            <p className="text-text-muted font-body mb-4 group-hover:text-white/80 transition-colors">
              {feature.description}
            </p>

            <span className="text-xs font-body text-text-dim italic block border-t border-white/5 pt-4">
              {feature.tr}
            </span>

            {/* Micro-interaction icon */}
            <div className="absolute bottom-8 right-8 text-white/5 group-hover:text-primary/20 transition-colors duration-500">
               <Search className="w-12 h-12" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
