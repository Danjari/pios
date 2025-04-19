"use client"

import { useState } from "react"
import { FiliereCard } from "@/components/filieres/filiere-card"
import type { Filiere } from "@/lib/data"

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
            className="px-6 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Voir plus de filières
          </button>
        </div>
      )}
    </div>
  )
}
