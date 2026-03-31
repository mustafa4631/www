"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { NAV_LINKS, GITHUB_URL } from "@/lib/constants";
import TransitionLink from "./TransitionLink";
import { useLocale } from "@/context/LocaleContext";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const getNavLinkLabel = (label: string) => {
    const key = `nav.${label.toLowerCase()}`;
    return t(key);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(13, 26, 20, 0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(26, 107, 74, 0.15)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-lg font-semibold tracking-tight"
            style={{ color: "#e8f5ee" }}
          >
            GK Healter
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const route = link.href.startsWith("#") ? `/${link.href.substring(1)}` : link.href;
              return (
                <TransitionLink
                  key={link.href}
                  href={route}
                  className="text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  <span
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#3dd68c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8ab89a")
                    }
                    style={{ transition: "color 0.2s", color: "#8ab89a" }}
                  >
                    {getNavLinkLabel(link.label)}
                  </span>
                </TransitionLink>
              );
            })}
            <LanguageToggle />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200"
              style={{
                border: "1px solid rgba(26, 107, 74, 0.4)",
                color: "#3dd68c",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a6b4a";
                e.currentTarget.style.color = "#e8f5ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#3dd68c";
              }}
            >
              <Github className="h-4 w-4" />
              {t("nav.github")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 cursor-pointer"
            style={{ color: "#8ab89a" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(13, 26, 20, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(26, 107, 74, 0.15)",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_LINKS.map((link) => {
                const route = link.href.startsWith("#") ? `/${link.href.substring(1)}` : link.href;
                return (
                  <TransitionLink
                    key={link.href}
                    href={route}
                  >
                    <div
                      onClick={handleLinkClick}
                      className="block w-full text-left text-base font-medium transition-colors cursor-pointer"
                      style={{ color: "#8ab89a" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#3dd68c")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#8ab89a")
                      }
                    >
                      {getNavLinkLabel(link.label)}
                    </div>
                  </TransitionLink>
                );
              })}
              <div className="pt-2">
                <LanguageToggle />
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors mt-2"
                style={{
                  border: "1px solid rgba(26, 107, 74, 0.4)",
                  color: "#3dd68c",
                }}
              >
                <Github className="h-4 w-4" />
                {t("nav.github")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
