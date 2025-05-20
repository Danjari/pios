// import React from "react";
// import University from "../../../components/universityClient"; // Client component
// import { fetchUniversites } from "@/lib/api";
// export const revalidate = 60;


// export default async function Universites() {
//   const universites = await fetchUniversites(); // Fetch from API

//   return (
//     <div>
//       {/* Pass fetched data to client component */}
//       <University universites={universites} />
//     </div>
//   );
// }
import { UniversitySearchFilters } from "@/components/universites/SearchFilters"
import { UniversityGrid } from "@/components/universites/grid"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">PIOS</h1>
          <p className="text-indigo-100">Projet d&apos;Orientation Scolaire au Niger</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Découvrez les universités</h2>
          <p className="text-gray-600 mb-8">
            Explorez les différentes universités du Niger et trouvez celle qui correspond à vos aspirations académiques.
          </p>

          <UniversitySearchFilters />

          <div className="mt-10">
            <UniversityGrid />
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
