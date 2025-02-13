"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image"; // Import Image for optimized image rendering

export default function University({ universites }) {
  const [search, setSearch] = useState("");

  const filteredUniversites = universites.filter((university) =>
    university.nomDeLUniversite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-black flex items-start justify-center mt-20 px-4 sm:px-8">
      {/* Background with Radial Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Explore les meilleures universités
        </h1>
        <p className="text-center mb-6 text-gray-700 text-sm sm:text-base">
          Choisis ta université en ayant toutes les informations nécessaires ici sur PIOS.
        </p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Rechercher une université..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUniversites.length > 0 ? (
            filteredUniversites.map((university) => (
              <div key={university.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
                {/* University Logo */}
                <div className="flex items-center mb-4">
                  {university.logo ? (
                    <Image
                      src={university.logo.url}
                      alt={university.nomDeLUniversite}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div> 
                  )}
                  <h2 className="text-lg font-semibold">{university.nomDeLUniversite}</h2>
                </div>
                <p className="text-sm text-blue-800">{university.region}</p>
                <p className="text-sm text-gray-700">
                  {university.description
                    ? university.description.slice(0, 150) + (university.description.length > 150 ? "..." : "")
                    : "No description available"}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/universites/${university.slug}`}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucune université trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
}