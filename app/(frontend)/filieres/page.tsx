

import React from "react";
import HomeClient from "../components/homeClient";  // Separate client component


export const revalidate = 60;
// Fetch data from API
async function fetchFilieres() {
  try {
    //const baseUrl = typeof window !== "undefined"? window.location.origin : "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/filieres`);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data.success ? data.filieres : [];
  } catch (error) {
    console.error("Error fetching filieres:", error);
    return [];
  }
}

export default async function Home() {
  const filieres = await fetchFilieres(); // Fetch from API

  return (
    <div>
      {/* Pass fetched data to client component */}
      <HomeClient filieres={filieres} />
    </div>
  );
}