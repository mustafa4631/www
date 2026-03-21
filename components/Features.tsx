"use client";

import { motion } from "framer-motion";
import {
  Trash2,
  Activity,
  ShieldCheck,
  Brain,
  HardDrive,
  CalendarClock,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";
import AuroraBackground from "./AuroraBackground";

const iconMap: Record<string, LucideIcon> = {
  Trash2,
  Activity,
  ShieldCheck,
  Brain,
  HardDrive,
  CalendarClock,
};

const iconAnimations: Record<string, any> = {
  Trash2: { rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.5 } },
  Activity: { scale: [1, 1.3, 1, 1.2, 1], transition: { duration: 0.6, times: [0, 0.2, 0.4, 0.7, 1] } },
  ShieldCheck: { 
    filter: ["drop-shadow(0 0 0px #3dd68c)", "drop-shadow(0 0 8px #3dd68c)", "drop-shadow(0 0 4px #3dd68c)"],
    transition: { duration: 0.4 }
  },
  Brain: { rotate: 360, transition: { duration: 0.7, ease: "easeInOut" } },
  HardDrive: { 
    y: [0, -4, 0, -2, 0],
    transition: { duration: 0.5 }
  },
  CalendarClock: { rotate: [0, 360], transition: { duration: 0.8, ease: "linear" } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-28 lg:py-36"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      <AuroraBackground intensity={0.8} />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#e8f5ee" }}
          >
            Everything your system needs
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#8ab89a" }}
          >
            Six integrated modules working together to keep your Linux system
            clean, fast, and secure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            const hoverAnim = iconAnimations[feature.icon] || {};
            
            return (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                  hover: {
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.2 },
                  }
                }}
                whileHover="hover"
                className="group p-7 transition-all duration-300 cursor-pointer"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "rgba(13, 26, 20, 0.60)",
                  border: "1px solid rgba(26, 107, 74, 0.20)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26, 107, 74, 0.50)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(26, 107, 74, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26, 107, 74, 0.20)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scaleX: 0 },
                    visible: { opacity: 0, scaleX: 0 },
                    hover: { opacity: 1, scaleX: 1, transition: { duration: 0.3 } }
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #3dd68c, transparent)",
                    transformOrigin: "left",
                  }}
                />
                
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 relative"
                  style={{ color: "#3dd68c" }}
                >
                  <motion.div variants={{ hover: hoverAnim }}>
                    {Icon && <Icon className="h-5 w-5" strokeWidth={1.8} />}
                  </motion.div>
                  {feature.icon === "HardDrive" && (
                    <motion.div
                      variants={{
                        hidden: { top: "0%", opacity: 0 },
                        visible: { top: "0%", opacity: 0 },
                        hover: { 
                          top: ["0%", "100%"], 
                          opacity: [0, 1, 1, 0],
                          transition: { duration: 1, repeat: Infinity, ease: "linear" }
                        }
                      }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "#3dd68c",
                        boxShadow: "0 0 4px #3dd68c"
                      }}
                    />
                  )}
                </div>
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: "#e8f5ee" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#8ab89a" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
