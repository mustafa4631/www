"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HealthArcProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function HealthArc({ score, size = 200, strokeWidth = 15 }: HealthArcProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentScore / 100) * circumference;

  useEffect(() => {
    // Animate the number counting up
    const timer = setTimeout(() => {
      setCurrentScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  // Color logic based on score
  const getColor = (s: number) => {
    if (s >= 80) return "var(--color-health)";
    if (s >= 50) return "var(--color-warning)";
    return "var(--color-critical)";
  };

  const activeColor = getColor(currentScore);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${activeColor})`,
          }}
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-5xl font-bold font-display tracking-tight"
          style={{ color: activeColor }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {Math.round(currentScore)}
        </motion.span>
        <span className="text-[10px] font-display uppercase tracking-[0.2em] text-text-muted mt-1">
          Health Score
        </span>
      </div>

      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 blur-[40px] pointer-events-none"
        style={{ 
          background: activeColor,
          transition: "background 1s ease"
        }}
      />
    </div>
  );
}
