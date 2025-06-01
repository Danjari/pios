import { University, ChevronRight } from "lucide-react";
import Link from "next/link";




import { Button } from "../ui/button"

export default function LandingUniv() {
    return (
      <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <University className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Explore les universités accréditées au Niger.
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Compare les offres, conditions d&apos;accès, infrastructures, et plus.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/universites">
              Explorer les universités
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
    )
}