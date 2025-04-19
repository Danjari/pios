"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { bacOptions, categorieOptions, localisationOptions, filieres, Filiere } from "@/lib/data"

interface SearchFiltersProps {
  onFiltersChange: (filteredFilieres: Filiere[]) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<{
    bac: string | null
    categorie: string | null
    localisation: string | null
  }>({
    bac: null,
    categorie: null,
    localisation: null,
  })

  const handleFilterChange = (type: "bac" | "categorie" | "localisation", value: string | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      bac: null,
      categorie: null,
      localisation: null,
    })
    setSearchQuery("")
  }

  const hasActiveFilters = selectedFilters.bac || selectedFilters.categorie || selectedFilters.localisation || searchQuery

  // Filter filieres based on search query and selected filters
  useEffect(() => {
    const filteredFilieres = filieres.filter((filiere) => {
      // Search query filter
      const matchesSearch = searchQuery
        ? filiere.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          filiere.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      // Bac filter
      const matchesBac = selectedFilters.bac
        ? filiere.bacRequired.includes(selectedFilters.bac)
        : true

      // Category filter
      const matchesCategory = selectedFilters.categorie
        ? filiere.category === selectedFilters.categorie
        : true

      // Location filter
      const matchesLocation = selectedFilters.localisation
        ? filiere.locations.includes(selectedFilters.localisation)
        : true

      return matchesSearch && matchesBac && matchesCategory && matchesLocation
    })

    onFiltersChange(filteredFilieres)
  }, [searchQuery, selectedFilters, onFiltersChange])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          placeholder="Rechercher une filière..." 
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedFilters.bac || ""} onValueChange={(value) => handleFilterChange("bac", value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filière du Bac" />
            </SelectTrigger>
            <SelectContent>
              {bacOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.categorie || ""}
            onValueChange={(value) => handleFilterChange("categorie", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categorieOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedFilters.localisation || ""}
            onValueChange={(value) => handleFilterChange("localisation", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Localisation" />
            </SelectTrigger>
            <SelectContent>
              {localisationOptions.map((option) => (
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
              <SheetDescription>Affinez votre recherche de filières</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Filière du Bac</h3>
                <div className="flex flex-wrap gap-2">
                  {bacOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.bac === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("bac", selectedFilters.bac === option ? null : option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Catégorie</h3>
                <div className="flex flex-wrap gap-2">
                  {categorieOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.categorie === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("categorie", selectedFilters.categorie === option ? null : option)
                      }
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Localisation</h3>
                <div className="flex flex-wrap gap-2">
                  {localisationOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.localisation === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("localisation", selectedFilters.localisation === option ? null : option)
                      }
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
            {selectedFilters.bac && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Bac: {selectedFilters.bac}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("bac", null)} />
              </Badge>
            )}
            {selectedFilters.categorie && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.categorie}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("categorie", null)} />
              </Badge>
            )}
            {selectedFilters.localisation && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                {selectedFilters.localisation}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("localisation", null)} />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
