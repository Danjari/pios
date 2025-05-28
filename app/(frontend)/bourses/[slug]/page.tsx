import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Percent, Clock, GraduationCap, FileText, Users, Phone, Mail, Globe2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { fetchBourseBySlug } from "@/lib/api"



export default async function ScholarshipPage({ params }: { params: Promise<{ slug: string }> }) {
  const scholarship = await fetchBourseBySlug((await params).slug)

  if (!scholarship) {
    notFound()
  }

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
    <div className="min-h-screen bg-gray-50">
    

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/bourses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour aux bourses</span>
          </Link>

          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Badge className={`mb-2 ${getTypeColor(scholarship.type)} text-gray-800`}>{scholarship.type}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{scholarship.name}</h1>
                <p className="text-indigo-100">{scholarship.country}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Percent className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Couverture</p>
                    <p className="font-medium">{scholarship.coverage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">{scholarship.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Niveaux</p>
                    <p className="font-medium">{scholarship.levels.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Places</p>
                    <p className="font-medium">{scholarship.availableSpots || "Non spécifié"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 mb-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description de la bourse</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">{scholarship.fullDescription}</p>
                </CardContent>
              </Card>
            </section>

            {scholarship.partnerUniversities && scholarship.partnerUniversities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Universités partenaires</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scholarship.partnerUniversities.map((university, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                          {university.university}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {scholarship.testimonials && scholarship.testimonials.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Témoignages</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {scholarship.testimonials.map((testimonial, index) => (
                        <blockquote key={index} className="italic text-gray-600 border-l-4 border-indigo-200 pl-4">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                Conditions et processus
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Conditions d&apos;éligibilité</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {scholarship.eligibilityRequirements?.map((requirement, index) => (
                          <li key={index} className="text-gray-600">
                            {requirement.requirement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Processus de candidature</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        {scholarship.applicationProcess?.map((step, index) => (
                          <li key={index} className="text-gray-600">
                            {step.step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Documents requis</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {scholarship.requiredDocuments?.map((document, index) => (
                          <li key={index} className="text-gray-600">
                            {document.document}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {scholarship.applicationDeadline && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="font-semibold text-yellow-800 mb-2">Date limite de candidature</h3>
                        <p className="text-yellow-700">{scholarship.applicationDeadline}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informations de contact</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {scholarship.contactInfo?.email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-indigo-600" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a
                            href={`mailto:${scholarship.contactInfo.email}`}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {scholarship.contactInfo.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {scholarship.contactInfo?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-indigo-600" />
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <a
                            href={`tel:${scholarship.contactInfo.phone}`}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {scholarship.contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {scholarship.contactInfo?.website && (
                      <div className="flex items-center">
                        <Globe2 className="h-5 w-5 mr-3 text-indigo-600" />
                        <div>
                          <p className="text-sm text-gray-500">Site web</p>
                          <a
                            href={scholarship.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {scholarship.contactInfo.website}
                          </a>
                        </div>
                      </div>
                    )}

                    {scholarship.contactInfo?.address && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-indigo-600 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Adresse</p>
                          <p className="text-gray-700">{scholarship.contactInfo.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {scholarship.additionalNotes && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Notes supplémentaires</h3>
                    <p className="text-gray-600">{scholarship.additionalNotes}</p>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg" className="px-8">
              Postuler à cette bourse
            </Button>
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
