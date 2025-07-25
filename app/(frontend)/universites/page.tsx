import React from "react";
import UniversitiesPage from "@/components/universityClient"; // Client component
import { fetchUniversites } from "@/lib/api";
import Footer from "@/components/marketing/footer";
import NavBar from "@/components/marketing/navBar";



export default async function Universites() {
  const universites = await fetchUniversites(); // Fetch from API

  return (
    <>
    <NavBar/>
    <div>
      {/* Pass fetched data to client component */}
      <UniversitiesPage universites={universites} />
    </div>
    <Footer/>
    </>
  );
}

