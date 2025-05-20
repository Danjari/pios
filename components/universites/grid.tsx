"use client"

import { useState } from "react"
import { UniversityCard } from "@/components/universites/Card"
import { universities } from "@/lib/universityData"

export function UniversityGrid() {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.slice(0, visibleCount).map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </div>

      {visibleCount < universities.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Voir plus d&apos;universités
          </button>
        </div>
      )}
    </div>
  )
}
