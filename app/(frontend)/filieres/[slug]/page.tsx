import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, Clock, BookOpen, Briefcase, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { filieres } from "@/lib/data"
import { fetchFiliereBySlug } from "@/lib/api"

interface FilierePageProps {
  params: {
    slug: string
  }
}

// Define a type that combines both data sources
type CombinedFiliere = {
  id: string
  title?: string
  nomDeFiliere?: string
  category?: string
  Categorie?: "Engenieurie" | "Administration" | "Technologie" | "Agriculture" | "Science Sociale" | "Science de la Terre" | null
  duration?: string
  bacRequired?: string[]
  locations?: string[]
  fullDescription?: string
  longDescription_html?: string | null
  prerequisites?: string[]
  careerOpportunities?: string[]
  universities?: { name: string; location: string }[]
  salaireMoyen?: string | null
  slug?: string
  descriptionCourte?: string
  updatedAt?: string
  createdAt?: string
}

export default async function FilierePage({ params }: FilierePageProps) {
  // First try to fetch from API
  let filiere: CombinedFiliere | null = await fetchFiliereBySlug(params.slug);
  
  // If not found in API, try to find in local data
  if (!filiere) {
    const localFiliere = filieres.find((f) => f.id === params.slug);
    if (localFiliere) {
      filiere = localFiliere as unknown as CombinedFiliere;
    }
  }

  if (!filiere) {
    notFound()
  }

  // Cast to our combined type
  const combinedFiliere = filiere as CombinedFiliere;

  return (
    <div className="min-h-screen bg-gray-50">
     

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/filieres" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour aux filières</span>
          </Link>

          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-8">
            <Image
              src={`/placeholder.svg?height=300&width=800`}
              alt={combinedFiliere.title || combinedFiliere.nomDeFiliere || "Filière"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Badge className="mb-2">{combinedFiliere.category || combinedFiliere.Categorie}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{combinedFiliere.title || combinedFiliere.nomDeFiliere}</h1>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">{combinedFiliere.duration || "Non spécifié"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Bac requis</p>
                    <p className="font-medium">{combinedFiliere.bacRequired ? combinedFiliere.bacRequired.join(", ") : "Non spécifié"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Localisation</p>
                    <p className="font-medium">{combinedFiliere.locations ? combinedFiliere.locations.join(", ") : "Non spécifié"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
              <div className="prose max-w-none">
                {combinedFiliere.fullDescription ? (
                  <p>{combinedFiliere.fullDescription}</p>
                ) : combinedFiliere.longDescription_html ? (
                  <div dangerouslySetInnerHTML={{ __html: combinedFiliere.longDescription_html }} />
                ) : (
                  <p>Aucune description disponible</p>
                )}
              </div>
            </section>

            {combinedFiliere.prerequisites && combinedFiliere.prerequisites.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Prérequis</h2>
                <div className="prose max-w-none">
                  <ul className="space-y-2">
                    {combinedFiliere.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 text-center mr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        {prerequisite}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {combinedFiliere.careerOpportunities && combinedFiliere.careerOpportunities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
                    Débouchés professionnels
                  </div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {combinedFiliere.careerOpportunities.map((career, index) => (
                    <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                      {career}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {combinedFiliere.universities && combinedFiliere.universities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Où étudier cette filière</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {combinedFiliere.universities.map((university, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <h3 className="font-bold">{university.name}</h3>
                        <p className="text-gray-600 text-sm">{university.location}</p>
                        <div className="mt-3">
                          <Button variant="outline" size="sm" className="w-full">
                            Plus d&apos;informations
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} PIOS - Projet d&apos;Orientation Scolaire au Niger</p>
        </div>
      </footer>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // First try to fetch from API
  let filiere: CombinedFiliere | null = await fetchFiliereBySlug(params.slug);
  
  // If not found in API, try to find in local data
  if (!filiere) {
    const localFiliere = filieres.find((f) => f.id === params.slug);
    if (localFiliere) {
      filiere = localFiliere as unknown as CombinedFiliere;
    }
  }

  if (!filiere) {
    return {
      title: "Filiere Not Found",
      description: "This filiere could not be found.",
    };
  }

  const combinedFiliere = filiere as CombinedFiliere;
  const title = combinedFiliere.title || combinedFiliere.nomDeFiliere || "Filière";
  const description = combinedFiliere.fullDescription || 
                     (combinedFiliere.longDescription_html ? combinedFiliere.longDescription_html.replace(/<[^>]*>/g, '').slice(0, 160) : "Filiere details.");

  return {
    title,
    description,
  };
}