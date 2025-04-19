import Link from "next/link"
import { Clock, BookOpen, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Filiere } from "@/lib/data"

interface FiliereCardProps {
  filiere: Filiere
}

export function FiliereCard({ filiere }: FiliereCardProps) {
  // Generate a slug from the id
  const slug = filiere.id;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{filiere.title}</h3>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            {filiere.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{filiere.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
            <span>Bac {filiere.bacRequired.join(", ")}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{filiere.locations.join(", ")}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{filiere.shortDescription}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={`/filieres/${slug}`} className="w-full">
          <Button className="w-full">Voir plus</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
