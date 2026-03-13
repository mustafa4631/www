"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TECH_STACK } from "@/lib/constants";

interface Node {
  id: string;
  label: string;
  subLabel: string;
  description: string;
  x: number;
  y: number;
  layer: number;
  type: "action" | "ui" | "engine" | "support";
}

interface Edge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

const NODES: Node[] = [
  // Layer 1
  {
    id: "action",
    label: "User Action",
    subLabel: "Trigger Event",
    description: "User initiates a Clean, Scan, Health Check or AI Analysis through the GTK interface.",
    x: 500,
    y: 60,
    layer: 1,
    type: "action",
  },
  // Layer 2
  {
    id: "ui",
    label: "ui.py",
    subLabel: "Interface Controller",
    description: "The main brain of the UI. It coordinates signals between GTK widgets and backend engines.",
    x: 400,
    y: 180,
    layer: 2,
    type: "ui",
  },
  {
    id: "polkit",
    label: "Polkit Auth",
    subLabel: "pkexec",
    description: "Handles secure privilege escalation for operations requiring root access (e.g., system-wide cleanup).",
    x: 650,
    y: 180,
    layer: 2,
    type: "support",
  },
  // Layer 3 (Engines)
  {
    id: "cleaner",
    label: "cleaner.py",
    subLabel: "Whitelist scan → safe delete",
    description: "Safely removes temporary files and caches using a strict whitelist policy to prevent accidental data loss.",
    x: 125,
    y: 400,
    layer: 3,
    type: "engine",
  },
  {
    id: "health",
    label: "health_engine.py",
    subLabel: "CPU / RAM / Disk → Score 0–100",
    description: "Monitors real-time system metrics and calculates a composite health score using weighted averages.",
    x: 375,
    y: 400,
    layer: 3,
    type: "engine",
  },
  {
    id: "security",
    label: "security_scanner.py",
    subLabel: "SUID · permissions · SSH",
    description: "Audits system security configurations, checking for world-writable files, SUID binaries, and SSH risks.",
    x: 625,
    y: 400,
    layer: 3,
    type: "engine",
  },
  {
    id: "ai",
    label: "ai_engine.py",
    subLabel: "Local analysis → optional cloud",
    description: "Interprets system logs and metrics using local logic or optional cloud LLM APIs for advanced insights.",
    x: 875,
    y: 400,
    layer: 3,
    type: "engine",
  },
  // Layer 4 (Support)
  {
    id: "pardus",
    label: "pardus_analyzer.py",
    subLabel: "repo & service health",
    description: "Checks Pardus-specific repository status and critical system service health.",
    x: 200,
    y: 620,
    layer: 4,
    type: "support",
  },
  {
    id: "log",
    label: "log_analyzer.py",
    subLabel: "journal error classification",
    description: "Classifies systemd journal errors and highlights critical issues needing attention.",
    x: 450,
    y: 620,
    layer: 4,
    type: "support",
  },
  {
    id: "report",
    label: "report_exporter.py",
    subLabel: "TXT / HTML / JSON output",
    description: "Generates professional reports in multiple formats for audit trails and documentation.",
    x: 750,
    y: 620,
    layer: 4,
    type: "support",
  },
];

const EDGES: Edge[] = [
  { from: "action", to: "ui" },
  { from: "ui", to: "polkit", label: "if root needed", dashed: true },
  { from: "ui", to: "cleaner" },
  { from: "ui", to: "health" },
  { from: "ui", to: "security" },
  { from: "ui", to: "ai" },
  { from: "cleaner", to: "log" },
  { from: "health", to: "pardus" },
  { from: "security", to: "log" },
  { from: "ai", to: "log" },
  { from: "cleaner", to: "report" },
  { from: "health", to: "report" },
  { from: "security", to: "report" },
  { from: "ai", to: "report" },
];

function Node({ node, isHovered, onHover, isConnected }: { 
  node: Node; 
  isHovered: boolean; 
  onHover: (id: string | null) => void;
  isConnected: boolean;
}) {
  const isEngine = node.type === "engine";
  const isAction = node.type === "action";
  
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: node.layer * 0.2, 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100 
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-help"
    >
      <motion.rect
        x={node.x - 100}
        y={node.y - 35}
        width={200}
        height={70}
        rx={12}
        fill={isAction ? "var(--color-forest-600)" : "white"}
        stroke={isHovered || isConnected ? "var(--color-forest-500)" : node.layer === 4 ? "#e5e7eb" : "#d1d5db"}
        strokeWidth={isHovered || isConnected ? 2 : 1.5}
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}
        className="transition-shadow duration-200"
      />
      {isEngine && (
        <rect 
          x={node.x - 100} 
          y={node.y - 35} 
          width={6} 
          height={70} 
          rx={3} 
          fill="var(--color-forest-600)" 
        />
      )}
      <text
        x={node.x}
        y={node.y - 8}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={isAction ? "white" : "var(--color-ink-900)"}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {node.label}
      </text>
      <text
        x={node.x}
        y={node.y + 12}
        textAnchor="middle"
        fontSize="10"
        fontWeight="400"
        fill={isAction ? "rgba(255,255,255,0.8)" : "var(--color-ink-400)"}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {node.subLabel}
      </text>
    </motion.g>
  );
}

function Connection({ edge, fromNode, toNode, hoveredNode }: { 
  edge: Edge; 
  fromNode: Node; 
  toNode: Node;
  hoveredNode: string | null;
}) {
  const isHovered = hoveredNode === fromNode.id || hoveredNode === toNode.id;
  
  // Straight or slightly curved lines? Let's use simple lines for now but with path calculation
  const x1 = fromNode.x;
  const y1 = fromNode.y + 35;
  const x2 = toNode.x;
  const y2 = toNode.y - 35;

  const path = `M ${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}`;

  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke={isHovered ? "var(--color-forest-400)" : "#e5e7eb"}
        strokeWidth={isHovered ? 2.5 : 1.5}
        strokeDasharray={edge.dashed ? "5,5" : "none"}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + Math.min(fromNode.layer, toNode.layer) * 0.2, duration: 1 }}
      />
      {edge.label && (
        <motion.text
          x={(x1 + x2) / 2 + 10}
          y={(y1 + y2) / 2}
          fontSize="9"
          fill="var(--color-ink-300)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {edge.label}
        </motion.text>
      )}
      {/* Pulse Animation */}
      <motion.circle
        r="3"
        fill="var(--color-forest-500)"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 4
        }}
        style={{ offsetPath: `path("${path}")` }}
      />
    </g>
  );
}

export default function Architecture() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeNodeData = NODES.find(n => n.id === hoveredNode);

  return (
    <section id="architecture" className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Built for Reliability
          </h2>
          <p className="mt-6 text-lg text-ink-400 leading-relaxed">
            GK Healter follows a strictly modular architecture. Each component is isolated, 
            communicating through clean interfaces to ensure system stability even during deep scans.
          </p>
        </motion.div>

        {/* Interactive Visualization */}
        <div className="mt-20 relative rounded-3xl border border-surface-200 bg-surface-50 p-4 sm:p-8 lg:p-12">
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-forest-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-ink-300 uppercase">Runtime Data Flow</span>
          </div>

          <svg
            viewBox="0 0 1000 750"
            className="w-full h-auto"
            aria-label="GK Healter Runtime Architecture Diagram"
          >
            {/* Edges */}
            {EDGES.map((edge, idx) => {
              const fromNode = NODES.find(n => n.id === edge.from);
              const toNode = NODES.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              return (
                <Connection 
                  key={`edge-${idx}`} 
                  edge={edge} 
                  fromNode={fromNode} 
                  toNode={toNode} 
                  hoveredNode={hoveredNode}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => (
              <Node 
                key={node.id} 
                node={node} 
                isHovered={hoveredNode === node.id}
                onHover={setHoveredNode}
                isConnected={
                  EDGES.some(e => (e.from === hoveredNode && e.to === node.id) || (e.to === hoveredNode && e.from === node.id))
                }
              />
            ))}

            {/* Tooltip within SVG for better alignment */}
            <AnimatePresence>
              {activeNodeData && (
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={20}
                    y={680}
                    width={960}
                    height={50}
                    rx={8}
                    fill="white"
                    stroke="var(--color-forest-100)"
                    strokeWidth="1"
                  />
                  <text
                    x={40}
                    y={710}
                    fontSize="13"
                    fill="var(--color-ink-600)"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <tspan fontWeight="700" fill="var(--color-forest-600)">{activeNodeData.label}: </tspan>
                    {activeNodeData.description}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Tech Stack Table — Rebuilt clean */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <div className="flex items-end justify-between mb-8">
            <h3 className="font-display text-2xl font-bold text-ink-900">
              Technical Foundation
            </h3>
            <div className="h-px flex-1 bg-surface-200 mx-8 mb-2 hidden sm:block" />
          </div>
          
          <div className="grid gap-px overflow-hidden rounded-2xl border border-surface-200 bg-surface-200 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((item) => (
              <div key={item.label} className="bg-white p-8 group hover:bg-surface-50 transition-colors duration-300">
                <dt className="text-xs font-bold tracking-widest text-ink-300 uppercase mb-2">
                  {item.label}
                </dt>
                <dd className="text-lg font-semibold text-ink-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
