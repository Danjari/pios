import React from "react";
import University from "../components/universityClient"; // Client component
import { fetchUniversites } from "@/lib/api";
export const revalidate = 60;


export default async function Universites() {
  const universites = await fetchUniversites(); // Fetch from API

  return (
    <div>
      {/* Pass fetched data to client component */}
      <University universites={universites} />
    </div>
  );
}