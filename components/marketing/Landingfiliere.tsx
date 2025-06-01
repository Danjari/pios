import { GraduationCap } from "lucide-react"
import { ChevronRight, Link } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

export default function Landingfiliere() {
    return (
        <div>
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                            <GraduationCap className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            500+ filières disponibles, pour tous les profils.
                        </h2>
                        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                            Trouvez des programmes adaptés à votre profil et à votre bac.
                        </p>
                        <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Link href="/filieres">
                                Voir toutes les filières
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Sciences & Technologie", count: "150+ programmes", color: "bg-blue-50 text-blue-600" },
                            { title: "Sciences Humaines", count: "120+ programmes", color: "bg-green-50 text-green-600" },
                            { title: "Commerce & Gestion", count: "100+ programmes", color: "bg-purple-50 text-purple-600" },
                        ].map((item, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-8 text-center">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${item.color}`}>
                                        <GraduationCap className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.count}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}