import Link from "next/link"
import Image from "next/image"
import { MapPin, GraduationCap, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { University } from "@/lib/universityData"

interface UniversityCardProps {
  university: University
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={university.bannerImage || `/placeholder.svg?height=160&width=400`}
          alt={university.name}
          fill
          className="object-cover"
        />
        {university.logo && (
          <div className="absolute -bottom-6 left-4 h-16 w-16 rounded-full bg-white p-1 shadow-md">
            <div className="relative h-full w-full rounded-full overflow-hidden">
              <Image
                src={university.logo || "/placeholder.svg"}
                alt={`${university.name} logo`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <CardContent className="flex-grow pt-8">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800">{university.name}</h3>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              {university.type}
            </Badge>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
            <span>
              {university.city}, {university.country}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{university.educationSystem}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{university.graduatesCount} diplômés</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/universites/${university.id}`} className="w-full">
          <Button className="w-full">Voir plus</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
