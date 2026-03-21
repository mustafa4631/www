"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function InstallPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
    >
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Install />
      </main>
      <Footer />
    </motion.div>
  );
}
