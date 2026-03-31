import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Security from "@/components/Security";
import Install from "@/components/Install";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";
import TerminalDemo from "@/components/TerminalDemo";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <SectionTransition id="features">
          <Features />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="architecture">
          <Architecture />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="security">
          <Security />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="install">
          <Install />
        </SectionTransition>
        <div className="section-divider" />
        <SectionTransition id="terminal">
          <TerminalDemo />
        </SectionTransition>
        <div className="section-divider" />
      </main>
      <Footer />
    </>
  );
}
