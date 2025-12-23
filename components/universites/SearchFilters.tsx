"use client"

import { useState,useEffect } from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { Universite } from "@/payload-types"
import {  type, localisationOptions } from "@/lib/data"
// check the search filter of filieres to fix the remaining issues. 

// creating the interface 
interface SearchFiltersPropsUni{
  universites: Universite[]
  onFiltersChange: (filteredUniversites:Universite[])=>void
}
export function UniversitySearchFilters({universites,onFiltersChange}:SearchFiltersPropsUni) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<{
    
    type: string | null
    localisation: string | null
  }>({
    
    type: null,
    localisation: null,
  })

  const handleFilterChange = (type:  "type" | "localisation", value: string | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
     
      type: null,
      localisation: null,
    })
    setSearchQuery("")
  }

  const hasActiveFilters =  selectedFilters.type || selectedFilters.localisation
   // Filter filieres based on search query and selected filters
    useEffect(() => {
      const filteredFilieres = universites.filter((universite) => {
        // Search query filter

          const matchesSearch = searchQuery
          ? [universite.nomDeLUniversite, universite.description].some(text =>
              text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(
                  searchQuery.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                )
            )
          : true
  
        // Bac filter
        // const matchesBac = selectedFilters.bac
        //   ? universite.bacRequired?.includes(selectedFilters.bac as "A" | "C" | "D" | "F1" | "F2" | "F3" | "G1" | "G2")
        //   : true
  
        // Category filter
        const matchesType = selectedFilters.type
          ? universite.type === selectedFilters.type
          : true
  
        // Location filter
        const matchesLocation = selectedFilters.localisation
          ? universite.region?.includes(selectedFilters.localisation as "Niamey" | "Maradi" | "Zinder" | "Tahoua" | "Agadez" | "Dosso" | "Diffa" | "Tillabéri")
          : true
  
        return matchesSearch && matchesType && matchesLocation
      })
      onFiltersChange(filteredFilieres)
    }, [searchQuery, selectedFilters, onFiltersChange, universites])
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input placeholder="Rechercher une université..." className="pl-10 py-6 text-base" />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* <Select value={selectedFilters.bac || ""} onValueChange={(value) => handleFilterChange("bac", value || null)}>
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
          </Select> */}

          <Select
            value={selectedFilters.type || ""}
            onValueChange={(value) => handleFilterChange("type", value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {type.map((option) => (
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
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-800">
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
              <SheetDescription>Affinez votre recherche d&apos;universités</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* <div className="space-y-3">
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
              </div> */}

              <div className="space-y-3">
                <h3 className="font-medium">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {type.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFilters.type === option ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("type", selectedFilters.type === option ? null : option)
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
            {/* {selectedFilters.bac && (
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Bac: {selectedFilters.bac}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("bac", null)} />
              </Badge>
            )} */}
            {selectedFilters.type && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {selectedFilters.type}
                <X size={14} className="ml-1 cursor-pointer" onClick={() => handleFilterChange("type", null)} />
              </Badge>
            )}
            {selectedFilters.localisation && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
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
