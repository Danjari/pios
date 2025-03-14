import React from "react";
import University from "../components/universityClient"; // Client component

// Fetch data from API
async function fetchUniversites() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/universites`);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data.success ? data.universites : [];
  } catch (error) {
    console.error("Error fetching universites:", error);
    return [];
  }
}

export default async function Universites() {
  const universites = await fetchUniversites(); // Fetch from API

  return (
    <div>
      {/* Pass fetched data to client component */}
      <University universites={universites} />
    </div>
  );
}