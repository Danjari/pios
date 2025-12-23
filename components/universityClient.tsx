'use client'
import { useState } from "react"
import { UniversitySearchFilters } from "@/components/universites/SearchFilters"
import { UniversityGrid } from "@/components/universites/grid"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type {Universite } from "@/payload-types" // Replace this with the actual new interface from payload-types
//import { fetchFilieres } from "@/lib/api" // Create or adjust this path to match the real file

interface Props {
  universites: Universite[]
}


export default function UniversitiesPage({universites}:Props) {
  
  const [allUniversities] = useState<Universite[]>(universites)
  const [filteredUniversties, setFilteredUniversities] = useState<Universite[]>(universites)
  return (
    <div className="min-h-screen bg-white">
      

      <main className="container mx-auto px-4 pt-24 pb-12 md:pt-28">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <h2 className="text-3xl md:text-4xl text-[#142948] tracking-tight mb-4">Découvrez les universités</h2>
          <p className="text-gray-600 mb-8">
            Explorez les différentes universités du Niger et trouvez celle qui correspond à vos aspirations académiques.
          </p>

          <UniversitySearchFilters universites={allUniversities} onFiltersChange={setFilteredUniversities}/>

          <div className="mt-10">
            <UniversityGrid universities={filteredUniversties} />
          </div>
        </div>
      </main>
    </div>
  )
}
