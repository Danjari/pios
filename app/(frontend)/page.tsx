"use client";

import Hero from "@/components/marketing/hero";
import Landingfiliere from "@/components/marketing/Landingfiliere";
import LandingUniv from "@/components/marketing/LandingUniv";
import LandingBourse from "@/components/marketing/LandingBourse";
import NavBar from "@/components/marketing/navBar";
import Footer from "@/components/marketing/footer";
export default function LandingPage() {
  return (
    <>
    <NavBar/>
    <div>
      <Hero />
      <LandingBourse />
      <Landingfiliere />
      <LandingUniv />
    </div>
    <Footer/>
    </>
    );
}