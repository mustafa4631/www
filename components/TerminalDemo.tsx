"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

type Command = "health-check" | "security-scan" | "clean --dry-run" | "ai-analyze";

interface TerminalLine {
  text: string;
  type: "command" | "info" | "success" | "warning" | "error" | "divider" | "score" | "default" | "high" | "med" | "low";
}

const COMMAND_OUTPUTS: Record<Command, TerminalLine[]> = {
  "health-check": [
    { text: "→ Initializing health engine...", type: "info" },
    { text: "✓ CPU usage: 23% [GOOD]", type: "success" },
    { text: "✓ RAM usage: 61% [NORMAL]", type: "success" },
    { text: "✓ Disk usage: 44% [GOOD]", type: "success" },
    { text: "✓ Failed services: 0", type: "success" },
    { text: "✓ Journal errors (24h): 3 [LOW]", type: "success" },
    { text: "━━━━━━━━━━━━━━━━━━━━━━━━", type: "divider" },
    { text: "  System Health Score: 94/100", type: "score" },
    { text: "  Status: EXCELLENT", type: "score" },
  ],
  "security-scan": [
    { text: "→ Starting security audit...", type: "info" },
    { text: "→ Scanning for world-writable files...", type: "info" },
    { text: "✓ No dangerous world-writable files found", type: "success" },
    { text: "→ Checking SUID binaries...", type: "info" },
    { text: "✓ All SUID files match whitelist", type: "success" },
    { text: "→ Auditing SSH configuration...", type: "info" },
    { text: "⚠ PermitRootLogin not explicitly disabled", type: "warning" },
    { text: "→ Checking sudoers...", type: "info" },
    { text: "✓ No NOPASSWD:ALL entries found", type: "success" },
    { text: "→ Verifying auto-updates...", type: "info" },
    { text: "✓ Automatic security updates: enabled", type: "success" },
    { text: "━━━━━━━━━━━━━━━━━━━━━━━━", type: "divider" },
    { text: "  Security Score: 87/100", type: "score" },
    { text: "  1 warning found — run with --fix to resolve", type: "score" },
  ],
  "clean --dry-run": [
    { text: "→ Scanning system (dry run — no files will be deleted)...", type: "info" },
    { text: "→ APT cache: 1.2 GB reclaimable", type: "info" },
    { text: "→ Old log files: 340 MB reclaimable", type: "info" },
    { text: "→ Browser caches: 890 MB reclaimable", type: "info" },
    { text: "→ Coredump files: 0 MB", type: "info" },
    { text: "→ Orphaned packages: 12 packages", type: "info" },
    { text: "→ Thumbnail cache: 156 MB reclaimable", type: "info" },
    { text: "━━━━━━━━━━━━━━━━━━━━━━━━", type: "divider" },
    { text: "  Total reclaimable: 2.58 GB", type: "score" },
    { text: "  Run without --dry-run to clean", type: "score" },
  ],
  "ai-analyze": [
    { text: "→ Running local analysis engine...", type: "info" },
    { text: "→ Analyzing system patterns...", type: "info" },
    { text: "✓ Analysis complete — 4 recommendations", type: "success" },
    { text: "", type: "default" },
    { text: "[HIGH] RAM usage trending upward over 7 days", type: "high" },
    { text: "  → Consider reviewing memory-heavy startup services", type: "info" },
    { text: "", type: "default" },
    { text: "[MED]  APT cache exceeds 1GB threshold", type: "med" },
    { text: "  → Run: gk-healter clean --apt-cache", type: "info" },
    { text: "", type: "default" },
    { text: "[MED]  SSH root login not explicitly disabled", type: "med" },
    { text: "  → Run: gk-healter security --fix-ssh", type: "info" },
    { text: "", type: "default" },
    { text: "[LOW]  47 orphaned packages detected", type: "low" },
    { text: "  → Run: gk-healter clean --orphans", type: "info" },
  ],
};

export default function TerminalDemo() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<Command>("health-check");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetTerminal();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCommand]);

  const resetTerminal = () => {
    setLines([
      { text: "GK Healter v0.1.6 — Interactive Demo", type: "success" },
      { text: "Type a command or select one above.", type: "default" },
      { text: "Ready.", type: "default" },
    ]);
    setCurrentCommand("");
    setIsTyping(false);
  };

  const runCommand = async () => {
    if (isTyping) return;
    setIsTyping(true);
    setLines([]);
    
    // Typewriter effect for command
    const cmd = activeTab;
    let typed = "";
    for (let i = 0; i < cmd.length; i++) {
        typed += cmd[i];
        setCurrentCommand(typed);
        await new Promise((r) => setTimeout(r, 40));
    }
    
    await new Promise((r) => setTimeout(r, 200));
    setLines([{ text: `$ gk-healter ${cmd}`, type: "command" }]);
    setCurrentCommand("");

    const output = COMMAND_OUTPUTS[cmd];
    for (const line of output) {
      let delay = 80;
      if (line.text.startsWith("→")) delay = 200;
      if (line.type === "score") delay = 400;
      
      await new Promise((r) => setTimeout(r, delay));
      setLines((prev) => [...prev, line]);
    }
    setIsTyping(false);
  };

  const getLineColor = (line: TerminalLine) => {
    switch (line.type) {
      case "command": return "#3dd68c font-bold";
      case "success": return "text-[#3dd68c]";
      case "warning": return "text-[#f59e0b]";
      case "info": return "text-[#8ab89a]";
      case "high": return "text-[#ef4444]";
      case "med": return "text-[#f59e0b]";
      case "low": return "text-[#8ab89a] opacity-70";
      case "divider": return "text-[rgba(26,107,74,0.50)]";
      case "score": return "text-[#e8f5ee] font-bold";
      default: return "text-[#8ab89a]";
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#e8f5ee" }}>
          {t("terminal.title")}
        </h2>
        <p className="text-lg max-w-2xl" style={{ color: "#8ab89a" }}>
          {t("terminal.subtitle")}
        </p>
      </div>

      <div className="w-full max-w-[800px]">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(COMMAND_OUTPUTS) as Command[]).map((cmd) => (
            <button
              key={cmd}
              onClick={() => !isTyping && setActiveTab(cmd)}
              disabled={isTyping}
              className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all duration-200 ${
                activeTab === cmd 
                  ? "border-[#3dd68c] bg-[rgba(26,107,74,0.15)] text-[#3dd68c]" 
                  : "border-[rgba(26,107,74,0.20)] bg-[rgba(13,26,20,0.60)] text-[#8ab89a] hover:border-[rgba(26,107,74,0.40)]"
              }`}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div 
          className="w-full rounded-xl overflow-hidden flex flex-col"
          style={{
            background: "rgba(5, 12, 8, 0.95)",
            border: "1px solid rgba(26, 107, 74, 0.30)",
            boxShadow: "0 0 80px rgba(26, 107, 74, 0.12)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(26,107,74,0.15)] bg-[rgba(13,26,20,0.40)]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28ca41]" />
            </div>
            <div className="text-xs font-mono text-[#4a6b57]">gk-healter — interactive demo</div>
            <div className="w-12" /> {/* alignment spacer */}
          </div>

          {/* Output Area */}
          <div 
            ref={terminalRef}
            className="p-6 h-[400px] overflow-y-auto font-mono text-sm sm:text-base leading-relaxed scrollbar-thin scrollbar-thumb-[rgba(26,107,74,0.3)]"
          >
            {lines.map((line, i) => (
              <div key={i} className={getLineColor(line)}>
                {line.text}
              </div>
            ))}
            {isTyping && (
                <div className="text-[#3dd68c] font-bold">
                    $ gk-healter {currentCommand}<span className="animate-pulse">▋</span>
                </div>
            )}
            {!isTyping && (
                <div className="flex items-center gap-1">
                    <span className="text-[#3dd68c] font-bold">$</span>
                    <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.7 }}
                        className="w-2.5 h-5 bg-[#3dd68c] block"
                    />
                </div>
            )}
          </div>

          {/* Footer / Controls */}
          <div className="p-4 border-t border-[rgba(26,107,74,0.15)] flex justify-end gap-3 bg-[rgba(13,26,20,0.20)]">
            <button
              onClick={resetTerminal}
              disabled={isTyping}
              className="px-4 py-2 text-xs font-semibold rounded-lg transition-colors border border-[rgba(26,107,74,0.3)] text-[#8ab89a] hover:bg-[rgba(26,107,74,0.1)] active:scale-95 disabled:opacity-50"
            >
              {t("terminal.reset_button")}
            </button>
            <button
              onClick={runCommand}
              disabled={isTyping}
              className="px-6 py-2 text-xs font-semibold rounded-lg transition-all duration-200 bg-[#1a6b4a] text-[#e8f5ee] shadow-[0_4px_12px_rgba(26,107,74,0.3)] hover:bg-[#2a9e6e] active:scale-95 disabled:opacity-50"
            >
              {t("terminal.run_button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
