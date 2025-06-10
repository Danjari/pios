
import { Clock, BookOpen, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {FunnyLoadingButton} from "@/components/FunnyButton"
import type { Filiere } from "@/payload-types"
// interface filiere card props 
interface FiliereCardProps {
  filiere: Filiere

}

export function FiliereCard({ filiere }: FiliereCardProps) {
  // Generate a slug from the id
  const slug = filiere.slug;


  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{filiere.nomDeFiliere}</h3>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            {filiere.category || "Non spécifié"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-indigo-600" />
            <span>
              {(() => {
                switch (filiere.duration) {
                  case "3": return <>3 ans <span className="italic">(Licence)</span></>;
                  case "4": return <>4 ans <span className="italic">(Licence + 1)</span></>;
                  case "5": return <>5 ans <span className="italic">(Master II)</span></>;
                  case "7": return <>7 ans <span className="italic">(Doctorat)</span></>;
                  default: return filiere.duration || "Non spécifié";
                }
              })()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
            <span>Bac {filiere.bacRequired?.join(", ") || "Non spécifié"}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
            <span>{filiere.locations?.join(", ") || "Non spécifié"} </span>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{filiere.descriptionCourte}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
      <FunnyLoadingButton
        href={`/filieres/${slug}`}
        className="w-full"
      />
      </CardFooter>
    </Card>
  )
}
