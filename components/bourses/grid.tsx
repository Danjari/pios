"use client"

import { useState } from "react"
import { ScholarshipCard } from "@/components/bourses/card"
//import { scholarships } from "@/lib/bourseData"
import type { Bourse } from "@/payload-types"

export function ScholarshipGrid({bourses}: {bourses: Bourse[]}) {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bourses.slice(0, visibleCount).map((bourse) => (
          <ScholarshipCard key={bourse.id} scholarship={bourse} />
        ))}
      </div>

      {visibleCount < bourses.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Voir plus de bourses
          </button>
        </div>
      )}
    </div>
  )
}
