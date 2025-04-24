import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, Clock, BookOpen, Briefcase, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { fetchFiliereBySlug } from "@/lib/api"
import type { Filiere } from "@/payload-types"

interface FilierePageProps {
  params: {
    slug: string
  }
}

export default async function FilierePage({ params }: FilierePageProps) {
  const filiere: Filiere | null = await fetchFiliereBySlug(params.slug)

  if (!filiere) notFound()

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
              alt={filiere.nomDeFiliere || "Filière"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Badge className="mb-2">{filiere.category}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{filiere.nomDeFiliere}</h1>
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
                    <p className="font-medium">{filiere.duration || "Non spécifié"}</p>
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
                    <p className="font-medium">{filiere.bacRequired?.join(", ") || "Non spécifié"}</p>
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
                    <p className="font-medium">{filiere.locations?.join(", ") || "Non spécifié"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
              <div className="prose max-w-none">
                {filiere.longDescription_html ? (
                  <div dangerouslySetInnerHTML={{ __html: filiere.longDescription_html }} />
                ) : (
                  <p>Aucune description disponible</p>
                )}
              </div>
            </section>

            {filiere.prerequisites && filiere.prerequisites.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Prérequis</h2>
                <div className="prose max-w-none">
                  <ul className="space-y-2">
                    {filiere.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 text-center mr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        {typeof prerequisite === 'string' ? prerequisite : prerequisite.item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {filiere.careerOpportunities && filiere.careerOpportunities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
                    Débouchés professionnels
                  </div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filiere.careerOpportunities.map((career, index) => (
                    <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                      {typeof career === 'string' ? career : career.item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filiere.universities && filiere.universities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Où étudier cette filière</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filiere.universities.map((university, index) => {
                    if (typeof university === 'string') return null // guard in case depth=0
                    return (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h3 className="font-bold">{university.nomDeLUniversite}</h3>
                          <p className="text-gray-600 text-sm">{university.region}</p>
                          <div className="mt-3">
                            <Button variant="outline" size="sm" className="w-full">
                              Plus d&apos;informations
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
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
  const filiere: Filiere | null = await fetchFiliereBySlug(params.slug)
  if (!filiere) {
    return {
      title: "Filiere Not Found",
      description: "This filiere could not be found.",
    }
  }

  const title = filiere.nomDeFiliere || "Filière"
  const description = filiere.longDescription_html
    ? filiere.longDescription_html.replace(/<[^>]*>/g, '').slice(0, 160)
    : "Filiere details."

  return {
    title,
    description,
  }
}
