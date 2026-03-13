"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-bg-deep flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 border-2 border-primary/20 rounded-full border-t-primary"
        />
        {/* Middle Ring */}
        <motion.div
           animate={{ rotate: -360 }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           className="absolute inset-4 border-2 border-violet/20 rounded-full border-b-violet"
        />
        {/* Inner Ring */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           className="absolute inset-8 border-2 border-health/20 rounded-full border-l-health"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
      </div>
    </div>
  );
}
