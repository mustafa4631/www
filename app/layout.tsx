import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GK Healter — Linux System Health & Maintenance",
  description:
    "Free, open-source Linux system maintenance & health monitoring utility for Pardus and Debian-based distributions. Real-time health scoring, AI analysis, security scanning, and more.",
  keywords: [
    "GK Healter",
    "Linux",
    "system maintenance",
    "Pardus",
    "Debian",
    "health monitoring",
    "open source",
    "security audit",
  ],
  authors: [
    { name: "Egehan KAHRAMAN" },
    { name: "Mustafa GÖKPINAR" },
  ],
  openGraph: {
    title: "GK Healter — Keep Your Computer Happy and Healthy 🌿",
    description:
      "Free, open-source Linux system maintenance utility for Pardus and Debian-based distributions.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="noise-grain">
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-link">
          İçeriğe Geç / Skip to Content
        </a>

        {/* Living mesh background */}
        <div className="living-mesh" aria-hidden="true" />

        {/* Floating ambient blobs */}
        <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="floating-blob w-[450px] h-[450px] left-[8%] top-[15%]"
            style={{ background: "rgba(0, 229, 204, 0.08)" }}
          />
          <div
            className="floating-blob w-[350px] h-[350px] left-[65%] top-[55%]"
            style={{
              background: "rgba(123, 94, 167, 0.06)",
              animationDelay: "-4s",
              animationDuration: "18s",
            }}
          />
          <div
            className="floating-blob w-[300px] h-[300px] left-[80%] top-[10%]"
            style={{
              background: "rgba(0, 229, 204, 0.05)",
              animationDelay: "-8s",
              animationDuration: "22s",
            }}
          />
          <div
            className="floating-blob w-[400px] h-[400px] left-[5%] top-[70%]"
            style={{
              background: "rgba(57, 255, 133, 0.04)",
              animationDelay: "-12s",
              animationDuration: "20s",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
