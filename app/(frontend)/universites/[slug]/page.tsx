import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, MapPin, GraduationCap, BookOpen, Award, FileText, Library, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Gallery } from "@/components/universites/gallery"
import { fetchUniversiteBySlug } from "@/lib/api"
import { VideoPlayer } from "@/components/universites/videoPlayer"
import NavBar from "@/components/marketing/navBar"
import Footer from "@/components/marketing/footer"

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const university = await fetchUniversiteBySlug((await params).slug)

  if (!university) {
    notFound()
  }

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gray-50">
      

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/universites" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour aux universités</span>
          </Link>

          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-8">
            <Image
              src={university.bannerImage?.url || `/placeholder.svg?height=300&width=800`}
              alt={university.nomDeLUniversite}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Badge className="mb-2">{university.type}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{university.nomDeLUniversite}</h1>
              </div>
            </div>
          </div>

          {university.logo && (
            <div className="flex justify-center -mt-16 mb-6">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src={university.logo?.url || "/placeholder.svg"}
                    alt={`${university.nomDeLUniversite} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Localisation</p>
                    <p className="font-medium">
                      {university.city}, {university.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Système d&apos;enseignement</p>
                    <p className="font-medium">{university.educationSystem}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Diplômés</p>
                    <p className="font-medium">{university.graduatesCount} diplômés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {university.motto && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-center italic text-indigo-800 mb-8">
              &quot;{university.motto}&quot;
            </div>
          )}

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Informations académiques
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Système d&apos;enseignement</h3>
                      <p>{university.educationSystem}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Durée de formation par cycle</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {university.cycleDuration?.map((cycle, index) => (
                          <li key={index}>{cycle.value}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Offre de formation</h3>
                      {university.faculties && university.faculties.length > 0 ? (
                        <Accordion type="multiple" className="w-full">
                          {university.faculties.map((faculty) => (
                            <AccordionItem key={faculty.id} value={faculty.id!} className="border rounded-lg mb-2">
                              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                <div className="text-left">
                                  <h4 className="font-medium text-gray-800">{faculty.name}</h4>
                                  {faculty.description && (
                                    <p className="text-sm text-gray-600 mt-1">{faculty.description}</p>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {faculty.filieres && faculty.filieres.length > 0 ? (
                                    faculty.filieres.map((program, index) => {
                                      if (typeof program === 'string') return null 
                                      return (
                                        <Link href={`/filieres/${program.slug}`} key={index}>
                                        <div className="bg-gray-50 hover:bg-indigo-50 p-3 rounded-md text-sm transition-colors border border-gray-200 hover:border-indigo-200">
                                          <span className="font-medium">{program.nomDeFiliere}</span>
                                        </div>
                                      </Link>
                                      )
                                    })
                                  ) : (
                                    <p className="text-sm text-gray-500 col-span-2">Aucune filière disponible</p>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {university.filieres?.map((program, index) => {
                            if (typeof program === 'string') return null
                            return (
                              <Link href={`/filieres/${program.slug}`} key={index}>
                              <div className="bg-gray-100 hover:bg-indigo-50 p-2 rounded-md text-sm transition-colors">
                                {program.nomDeFiliere}
                              </div>
                            </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Résultats académiques antérieurs</h3>
                      <p>{university.academicResults}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Nombre de diplômés sortis</h3>
                      <p>{university.graduatesCount} diplômés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                Admission et informations légales
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Conditions d&apos;accès</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {university.admissionRequirements && university.admissionRequirements.length>0 ?(
                          university.admissionRequirements!.map((requirement, index) => (
                            <li key={index}>{requirement.requirement}</li>
                          ))
                        ) : (
                          <p> no requirements</p>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Frais de formation</h3>
                      <div className="space-y-2">
                        {university.tuitionFees?.map((fee, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span>{fee.program}</span>
                            <span className="font-medium">{fee.amount} FCFA/an</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Reconnaissances officielles</h3>
                      <p>{university.accreditations}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Autorisation et arrêt d&apos;ouverture</h3>
                      <p>{university.authorization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Library className="h-5 w-5 mr-2 text-indigo-600" />
                Ressources du campus
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Moyens didactiques et logistiques</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {university.campusResources?.map((resource, index) => (
                          <li key={index}>{resource.resource}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Partenaires de l&apos;école</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {university.partners?.map((partner, index) => (
                          <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                            {partner.partner}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Vie étudiante
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Activités extra-académiques</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {university.studentActivities?.map((activity, index) => (
                          <li key={index}>{activity.activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Clubs et associations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {university.clubs?.map((club, index) => (
                          <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                            {club.club}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-indigo-600" />
                Galerie
              </h2>
              <Gallery 
                images={university.gallery?.map(item => ({
                  src: typeof item.src === 'string' ? item.src : item.src?.url || '',
                  alt: item.alt || '',
                  caption: item.caption || undefined
                })) || []}
                videos={university.videos?.map(video => ({
                  src: video.src || '',
                  title: video.title || ''
                })) || []}
              />
            </section>
            {university.videos && university.videos.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-indigo-600" />
                Vidéo de présentation
              </h2>
              <VideoPlayer 
                src={university.videos[0].src?.replace("watch?v=", "embed/") || ''} 
                title={university.videos[0].title || ''}
              />
            </section>
          )}

          </div>
        </div>
      </main>
     
    </div>
    <Footer/>
    </>
  )
}
