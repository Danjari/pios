"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link for navigation

export default function HomeClient({ filieres }) {
  const [search, setSearch] = useState("");

  const filteredFilieres = filieres.filter((filiere) =>
    filiere.nomDeFiliere.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Explore les meilleurs filières
        </h1>
        <p className="text-center mb-6 text-gray-700">
          Choisis ta filière en ayant toutes les informations nécessaires
          ici sur PIOS.
        </p>
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Rechercher une filière..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFilieres.map((filiere) => (
            <div key={filiere.id} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-500 text-sm">{filiere.date}</p>
              <h2 className="text-lg font-semibold my-2">
                <Link href={`/filieres/${filiere.slug}`}>{filiere.nomDeFiliere}</Link>
              </h2>
              <p className="text-sm text-blue-500">{filiere.region}</p>
              <p className="text-sm text-gray-700">{`Salaire: ${filiere.salaireMoyen}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
