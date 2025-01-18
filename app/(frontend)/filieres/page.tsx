import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import HomeClient from "../components/homeClient";  // Separate client component

// Server component that fetches data
async function fetchFilieres() {
  const payload = await getPayload({ config: configPromise });
  const { docs: filieres } = await payload.find({
    collection: "filieres",
    limit: 100, // Adjust as necessary
    sort: "title", // Or any other sort parameter you'd like
    select: {
      nomDeFiliere: true,
      slug: true,
      region: true,
      salaireMoyen: true,
      longDescription: true,
    },
  });
  return filieres;
}

export default async function Home() {
  const filieres = await fetchFilieres(); // Fetch data from Payload CMS

  return (
    <div>
      {/* Pass fetched data to client component */}
      <HomeClient filieres={filieres} />
    </div>
  );
}
