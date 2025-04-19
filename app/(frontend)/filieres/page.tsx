

import React from "react";
import HomeClient from "../../../components/homeClient";  // Separate client component

import { fetchFilieres } from "@/lib/api";
export const revalidate = 60;


export default async function Home() {
  const filieres = await fetchFilieres(); // Fetch from API

  return (
    <div>
      {/* Pass fetched data to client component */}
      <HomeClient filieres={filieres} />
    </div>
  );
}