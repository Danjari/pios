import { Button } from "../ui/button";

import {DollarSign,ChevronRight} from "lucide-react"
import Link from "next/link";

export default function LandingBourse() {
    return (
      <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Accède à des bourses qui changent ton avenir.
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Découvre les bourses gouvernementales, privées et internationales avec jusqu&apos;à 100% de prise en charge.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/bourses">
              Voir les bourses
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
    )
}