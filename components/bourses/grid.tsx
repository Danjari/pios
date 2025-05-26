"use client"

import { useState } from "react"
import { ScholarshipCard } from "@/components/bourses/card"
import { scholarships } from "@/lib/bourseData"

export function ScholarshipGrid() {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.slice(0, visibleCount).map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>

      {visibleCount < scholarships.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Voir plus de bourses
          </button>
        </div>
      )}
    </div>
  )
}
