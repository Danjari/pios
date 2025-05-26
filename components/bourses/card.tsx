import Link from "next/link"
import { Clock, Globe, Percent, GraduationCap } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
//import type { Scholarship } from "@/lib/bourseData"
import type { Bourse } from "@/payload-types"

interface ScholarshipCardProps {
  scholarship: Bourse
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Gouvernementale":
        return "bg-green-50 text-green-700 border-green-200"
      case "Internationale":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Privée":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Universitaire":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{scholarship.name}</h3>
          <Badge variant="outline" className={getTypeColor(scholarship.type)}>
            {scholarship.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Globe className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{scholarship.country}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Percent className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{scholarship.coverage} de couverture</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{scholarship.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{scholarship.levels.join(", ")}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{scholarship.shortDescription}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/bourses/${scholarship.id}`} className="w-full">
          <Button className="w-full">Voir plus</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
