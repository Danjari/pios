"use client";

import Hero from "@/components/marketing/hero";
import Landingfiliere from "@/components/marketing/Landingfiliere";
import LandingUniv from "@/components/marketing/LandingUniv";
import LandingBourse from "@/components/marketing/LandingBourse";
export default function LandingPage() {
  return (
    <div>
      <Hero />
      <LandingBourse />
      <Landingfiliere />
      <LandingUniv />
    </div>
  );
}