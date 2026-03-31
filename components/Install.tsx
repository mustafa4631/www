"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { INSTALL_TABS } from "@/lib/constants";

import { useLocale } from "@/context/LocaleContext";

export default function Install() {
  const [activeTab, setActiveTab] = useState(INSTALL_TABS[0].label);
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  const activeTabData = INSTALL_TABS.find((t) => t.label === activeTab);

  const copyToClipboard = () => {
    if (!activeTabData) return;
    const allCommands = activeTabData.commands.join("\n");
    navigator.clipboard.writeText(allCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="install" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#e8f5ee" }}
          >
            {t("install.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#8ab89a" }}
          >
            {t("install.subtitle")}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {INSTALL_TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    activeTab === tab.label
                      ? "rgba(26, 107, 74, 0.4)"
                      : "rgba(13, 26, 20, 0.4)",
                  border: `1px solid ${
                    activeTab === tab.label
                      ? "rgba(61, 214, 140, 0.4)"
                      : "rgba(26, 107, 74, 0.2)"
                  }`,
                  color: activeTab === tab.label ? "#3dd68c" : "#8ab89a",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Terminal Box */}
          <div
            className="relative rounded-2xl p-8 pt-12 overflow-hidden shadow-2xl"
            style={{
              background: "rgba(5, 12, 8, 0.95)",
              border: "1px solid rgba(26, 107, 74, 0.3)",
              boxShadow: "0 0 40px rgba(26, 107, 74, 0.1)",
            }}
          >
            {/* Header Dots */}
            <div className="absolute top-4 left-6 flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#28ca41" }} />
            </div>

            <pre className="font-mono text-sm sm:text-base overflow-x-auto">
              {activeTabData?.commands.map((cmd, idx) => (
                <div key={idx} className="flex gap-4 py-1">
                  <span className="shrink-0 opacity-30 select-none" style={{ color: "#3dd68c" }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: "#8ab89a" }}>
                    <span style={{ color: "#3dd68c" }}>$</span> {cmd}
                  </span>
                </div>
              ))}
            </pre>

            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-6 inline-flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer"
              style={{ color: copied ? "#3dd68c" : "#4a6b57" }}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  {t("install.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  {t("install.copy")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
