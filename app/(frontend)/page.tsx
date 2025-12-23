"use client";

import Footer from "@/components/marketing/footer";
import BentoGrid from "@/components/marketing/BentoGrid";
import Hero from "@/components/marketing/hero";
import NavBar from "@/components/marketing/navBar";
import { useEffect, useState } from "react";
export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<"hero" | "bento" | "footer">("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target.id === "discover") setActiveSection("bento");
          if (entry.target.id === "footer") setActiveSection("footer");
          if (entry.target.id === "hero") setActiveSection("hero");
        });
      },
      { threshold: 0.3 }
    );

    const hero = document.getElementById("hero");
    const bento = document.getElementById("discover");
    const footer = document.getElementById("footer");

    if (hero) observer.observe(hero);
    if (bento) observer.observe(bento);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const getBgColor = () => {
    switch (activeSection) {
      case "bento":
        return "bg-white";
      case "footer":
        return "bg-[#1e3a5f]";
      default:
        return "bg-[#142948]";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ease-in-out ${getBgColor()}`}>
      <NavBar theme={activeSection === "bento" ? "light" : "dark"} />

      <div className="flex-grow">
        <section id="hero">
          <Hero
            onCtaClick={() => {
              const bento = document.getElementById("discover");
              bento?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </section>

        <section id="discover" className="py-32 transition-colors duration-1000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BentoGrid />
          </div>
        </section>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}