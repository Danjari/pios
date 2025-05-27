'use client'

import { useState } from "react"
import { ScholarshipSearchFilters } from "@/components/bourses/filters"
import { ScholarshipGrid } from "@/components/bourses/grid"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import type {Bourse } from "@/payload-types" // Replace this with the actual new interface from payload-types
//import { fetchFilieres } from "@/lib/api" // Create or adjust this path to match the real file

interface Props {
  bourses: Bourse[]
}

export default function BoursesPage({bourses}:Props) {
  
  const [allBourses] = useState<Bourse[]>(bourses)
  const [filteredBourses, setFilteredBourses] = useState<Bourse[]>(bourses)
  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Découvrez les bourses</h2>
          <p className="text-gray-600 mb-8">
            Explorez les différentes opportunités de bourses d&apos;études disponibles pour les étudiants nigériens et
            trouvez celle qui correspond à vos besoins académiques et financiers.
          </p>

          <ScholarshipSearchFilters bourses={allBourses} onFiltersChange={setFilteredBourses} />

          <div className="mt-10">
            <ScholarshipGrid bourses={filteredBourses}  />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} PIOS - Projet d&apos;Orientation Scolaire au Niger</p>
        </div>
      </footer>
    </div>
  )
}
