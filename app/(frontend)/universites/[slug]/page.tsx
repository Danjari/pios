// import React from "react";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { fetchUniversiteBySlug } from "@/lib/api";

// export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
//   // Await params to properly extract slug
//   const { slug } = await params;

//   const university = await fetchUniversiteBySlug(slug);
//   if (!university) {
//     return notFound();
//   }

//   // Normalize logo
//   const normalizedLogo = typeof university.logo === "string" ? { url: university.logo } : university.logo || null;
 

//   return (
//     <div className="relative min-h-screen text-black flex items-start justify-center mt-20 px-4 sm:px-8">
//       {/* Background with Radial Gradient */}
//       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

//       <div className="max-w-4xl mx-auto relative z-10">
//         {/* University Logo and Title */}
//         <div className="flex items-center mb-6">
//           {normalizedLogo && (
//             <Image
//               src={normalizedLogo?.url || "/fallback-image.jpeg"}
//               alt={university.nomDeLUniversite}
//               width={80}
//               height={80}
//               className="rounded-full mr-4"
//             />
//           )}
//           <h1 className="text-3xl sm:text-4xl font-bold">{university.nomDeLUniversite}</h1>
//         </div>

//         {/* University Details */}
//         <p className="text-sm text-blue-500 mb-4">{university.region}</p>
//         <p className="bg-blue-50 border-l-4 border-blue-500 text-gray-700 text-base mb-6 p-4">
//           {university.description || "No description available"}
//         </p>

//         {/* Long Description */}
//         <div className="prose mb-8">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: university.longDescription_html || "",
//             }}
//           />
//         </div>

//         {/* Optional Link to return to the list of universities */}
//         <div className="text-center">
//           <Link href="/universites" className="text-blue-500 hover:text-blue-700">
//             Retour aux universités
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Generate metadata dynamically for SEO
// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const university = await fetchUniversiteBySlug(slug);

//   if (!university) {
//     return {
//       title: "Université non trouvée",
//       description: "Cette université n'existe pas.",
//     };
//   }

//   return {
//     title: university.nomDeLUniversite,
//     description: university.longDescription_html?.slice(0, 160) || "Détails sur l'université.",
//   };
// }


import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, MapPin, GraduationCap, BookOpen, Award, FileText, Library, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gallery } from "@/components/universites/gallery"
import { universities } from "@/lib/universityData"

interface UniversityPageProps {
  params: {
    id: string
  }
}

export default function UniversityPage({ params }: UniversityPageProps) {
  const university = universities.find((u) => u.id === params.id)

  if (!university) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">PIOS</h1>
          <p className="text-indigo-100">Projet d&apos;Orientation Scolaire au Niger</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/universites" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
            <ChevronLeft size={20} />
            <span>Retour aux universités</span>
          </Link>

          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-8">
            <Image
              src={university.bannerImage || `/placeholder.svg?height=300&width=800`}
              alt={university.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 w-full">
                <Badge className="mb-2">{university.type}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{university.name}</h1>
              </div>
            </div>
          </div>

          {university.logo && (
            <div className="flex justify-center -mt-16 mb-6">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src={university.logo || "/placeholder.svg"}
                    alt={`${university.name} logo`}
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
              &ldquo;{university.motto}&rdquo;
            </div>
          )}

          <Tabs defaultValue="academic" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="academic">Académique</TabsTrigger>
              <TabsTrigger value="admission">Admission</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
              <TabsTrigger value="student-life">Vie étudiante</TabsTrigger>
            </TabsList>
            <TabsContent value="academic" className="space-y-6">
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
                          {university.cycleDuration.map((cycle, index) => (
                            <li key={index}>{cycle}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">Offre de formation</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {university.programs.map((program, index) => (
                            <Link href={`/filieres/${program.id}`} key={index}>
                              <div className="bg-gray-100 hover:bg-indigo-50 p-2 rounded-md text-sm transition-colors">
                                {program.name}
                              </div>
                            </Link>
                          ))}
                        </div>
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
            </TabsContent>
            <TabsContent value="admission" className="space-y-6">
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
                          {university.admissionRequirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">Frais de formation</h3>
                        <div className="space-y-2">
                          {university.tuitionFees.map((fee, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-2">
                              <span>{fee.program}</span>
                              <span className="font-medium">{fee.amount}</span>
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
            </TabsContent>
            <TabsContent value="resources" className="space-y-6">
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
                          {university.campusResources.map((resource, index) => (
                            <li key={index}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">Partenaires de l&apos;école</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {university.partners.map((partner, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                              {partner}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
            <TabsContent value="student-life" className="space-y-6">
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
                          {university.studentActivities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">Clubs et associations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {university.clubs.map((club, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                              {club}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          </Tabs>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-600" />
              Galerie
            </h2>
            <Gallery images={university.gallery} videos={university.videos} />
          </section>
          <div className="flex justify-center mt-12">
          <Button size="lg" className="px-8">
                  Postuler à cette université
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
