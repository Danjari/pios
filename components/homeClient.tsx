
'use client'
import React, { useState } from "react"
import { SearchFilters } from "./filieres/search-filters"
import { FiliereGrid } from "./filieres/filiere-grid"
import type { Filiere } from "@/payload-types" // Replace this with the actual new interface from payload-types
//import { fetchFilieres } from "@/lib/api" // Create or adjust this path to match the real file

interface Props {
  filieres: Filiere[]
}

export default function HomeClient({filieres}:Props) {

  const [allFilieres] = useState<Filiere[]>(filieres)
  const [filteredFilieres, setFilteredFilieres] = useState<Filiere[]>(filieres)


  return (
    <div className="relative min-h-screen text-black flex items-start justify-center mt-20 px-4 sm:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Explore les meilleurs filières</h1>
        <p className="text-center mb-6 text-gray-700 text-sm sm:text-base">
          Choisis ta filière en ayant toutes les informations nécessaires ici sur PIOS.
        </p>

        <SearchFilters filieres={allFilieres} onFiltersChange={setFilteredFilieres} />

        <div className="mt-10">
          <FiliereGrid filieres={filteredFilieres} />
        </div>
      </div>
    </div>
  )
}