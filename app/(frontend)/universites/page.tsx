import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import University from "../components/universityClient";  // Separate client component

// Server component that fetches data
async function fetchUniversites() {
  const payload = await getPayload({ config: configPromise });
  const { docs: universites } = await payload.find({
    collection: "universites",
    limit: 100, // Adjust as necessary
    sort: "nomDeLUniversite", // Or any other sort parameter you'd like
    select: {
      nomDeLUniversite: true,
      slug: true,
      region: true,
      logo: true,
      description: true,
      longDescription: true,
    },
  });
  return universites;
}

export default async function Universites() {
  const universites = await fetchUniversites(); // Fetch data from Payload CMS

  return (
    <div>
      {/* Pass fetched data to client component */}
      <University universites={universites} />
    </div>
  );
}