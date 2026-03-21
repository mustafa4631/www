import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Security from "@/components/Security";
import Install from "@/components/Install";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionTransition id="features">
          <Features />
        </SectionTransition>
        <SectionTransition id="architecture">
          <Architecture />
        </SectionTransition>
        <SectionTransition id="security">
          <Security />
        </SectionTransition>
        <SectionTransition id="install">
          <Install />
        </SectionTransition>
      </main>
      <Footer />
    </>
  );
}
