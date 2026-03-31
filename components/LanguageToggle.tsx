"use client";

import { useLocale } from "@/context/LocaleContext";
import { Locale } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center p-1 backdrop-blur-md"
      style={{
        background: "rgba(13, 26, 20, 0.60)",
        border: "1px solid rgba(26, 107, 74, 0.25)",
        borderRadius: "8px",
      }}
    >
      {(["en", "tr"] as Locale[]).map((l) => {
        const isActive = locale === l;
        return (
          <motion.button
            key={l}
            onClick={() => setLocale(l)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 text-xs font-bold transition-all duration-200 uppercase tracking-wider"
            style={{
              backgroundColor: isActive ? "rgba(26, 107, 74, 0.50)" : "transparent",
              color: isActive ? "#3dd68c" : "#4a6b57",
              borderRadius: "4px",
            }}
          >
            {l}
          </motion.button>
        );
      })}
    </div>
  );
}
