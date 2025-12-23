"use client"

import { useState } from "react"
import { UniversityCard } from "@/components/universites/Card"
//import { universities } from "@/lib/universityData"
import type { Universite } from "@/payload-types"

interface UniversiteGridProps {
  universities: Universite[]
}

export function UniversityGrid({universities}:UniversiteGridProps) {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.slice(0, visibleCount).map((university) => (
          <UniversityCard key={university.slug} university={university} />
        ))}
      </div>

      {visibleCount < universities.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Voir plus d&apos;universités
          </button>
        </div>
      )}
    </div>
  )
}
