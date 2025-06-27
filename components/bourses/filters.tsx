"use client"
// implement the search filters after creating the bourse API. 
import { useEffect, useState } from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { coverageOptions, locationOptions, durationOptions, levelOptions, typeOptions } from "@/lib/bourseData"
import type { Bourse } from "@/payload-types"

interface SearchFiltersProps{
  bourses: Bourse[]
  onFiltersChange: (filteredBourses:Bourse[])=>void
}

export function ScholarshipSearchFilters({bourses,onFiltersChange}:SearchFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<{
    type: string | null
    location: string | null
    coverage: string | null
    duration: string | null
    level: string | null
  }>({
    type: null,
    location: null,
    coverage: null,
    duration: null,
    level: null,
  })


  const handleFilterChange = (type: keyof typeof selectedFilters, value: string | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      type: null,
      location: null,
      coverage: null,
      duration: null,
      level: null,
    })
    setSearchQuery("")
  }

  const hasActiveFilters = Object.values(selectedFilters).some((filter) => filter !== null)

  useEffect(()=>{
    const filteredBourses = bourses.filter((bourse) => {
      const matchesSearch = searchQuery
      ? [bourse.name, bourse.fullDescription].some((text) =>
          text?.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchQuery.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        )
      : true;
      const matchesType = selectedFilters.type ? bourse.type === selectedFilters.type : true
      const matchesLocation = selectedFilters.location ? bourse.country === selectedFilters.location : true
      const matchesCoverage = selectedFilters.coverage ? bourse.coverage === selectedFilters.coverage : true
      const matchesDuration = selectedFilters.duration ? bourse.duration === selectedFilters.duration : true
      const matchesLevel = selectedFilters.level ? bourse.levels.includes(selectedFilters.level as "Licence" | "Master" | "Doctorat") : true
      return matchesSearch && matchesType && matchesLocation && matchesCoverage && matchesDuration && matchesLevel
    })
    onFiltersChange(filteredBourses)
  },[searchQuery, selectedFilters,onFiltersChange,bourses])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Rechercher une bourse..."
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Select
            value={selectedFilters.type || ""}
            onValueChange={(value) => handleFilterChange("type", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de bourse" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.location || ""}
            onValueChange={(value) => handleFilterChange("location", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pays d'origine" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.coverage || ""}
            onValueChange={(value) => handleFilterChange("coverage", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Taux de couverture" />
            </SelectTrigger>
            <SelectContent>
              {coverageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.duration || ""}
            onValueChange={(value) => handleFilterChange("duration", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Durée" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.level || ""}
            onValueChange={(value) => handleFilterChange("level", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Niveau concerné" />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-indigo-600 hover:text-indigo-800">
              <X size={16} className="mr-1" />
              Effacer les filtres
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filtres
              </span>
              <ChevronDown size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filtres</SheetTitle>
              <SheetDescription>Affinez votre recherche de bourses</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Type de bourse</h3>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.type === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("type", selectedFilters.type === option ? null : option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Pays d&apos;origine</h3>
                <div className="flex flex-wrap gap-2">
                  {locationOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.location === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("location", selectedFilters.location === option ? null : option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Taux de couverture</h3>
                <div className="flex flex-wrap gap-2">
                  {coverageOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.coverage === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("coverage", selectedFilters.coverage === option ? null : option)
                      }
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Durée</h3>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.duration === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("duration", selectedFilters.duration === option ? null : option)
                      }
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Niveau concerné</h3>
                <div className="flex flex-wrap gap-2">
                  {levelOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.level === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("level", selectedFilters.level === option ? null : option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Effacer tout
              </Button>
              <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
                Appliquer
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Selected Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedFilters.type && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.type}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("type", null)} />
              </Badge>
            )}
            {selectedFilters.location && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.location}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("location", null)} />
              </Badge>
            )}
            {selectedFilters.coverage && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.coverage}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("coverage", null)} />
              </Badge>
            )}
            {selectedFilters.duration && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.duration}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("duration", null)} />
              </Badge>
            )}
            {selectedFilters.level && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.level}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("level", null)} />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
