import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Download from "@/components/Download";
import OpenSource from "@/components/OpenSource";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[100]">
         <div className="h-full bg-primary shadow-[0_0_8px_var(--color-primary)] w-0" id="scroll-progress" />
      </div>

      <Hero />
      
      <div className="relative z-10 space-y-32 pb-32">
        <Features />
        <OpenSource />
        <Download />
      </div>

      <Footer />

      {/* Script for scroll progress — simple vanilla JS as requested */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              document.getElementById("scroll-progress").style.width = scrolled + "%";
            });
          `
        }}
      />
    </main>
  );
}
