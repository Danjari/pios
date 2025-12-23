"use client"

import { useState } from "react"
import { FiliereCard } from "@/components/filieres/filiere-card"
import type { Filiere } from "@/payload-types"

interface FiliereGridProps {
  filieres: Filiere[]
}

export function FiliereGrid({ filieres }: FiliereGridProps) {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filieres.slice(0, visibleCount).map((filiere) => (
          <FiliereCard key={filiere.id} filiere={filiere} />
        ))}
      </div>

      {visibleCount < filieres.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Voir plus de filières
          </button>
        </div>
      )}
    </div>
  )
}
