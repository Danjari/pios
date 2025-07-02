import Image from "next/image";
//import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto w-full" aria-label="Site Footer">
      <div className="container mx-auto px-4 relative pt-12 sm:pt-0">
        {/* Iqra Orientation Logo - Overlapping Illusion */}
        <div className="absolute left-1/2 -top-8 sm:-top-10 transform -translate-x-1/2 z-10">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white p-2 shadow-lg flex items-center justify-center">
            <Image src="/footer.png" alt="Iqra Orientation Logo" width={64} height={64} className="rounded-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left gap-2">
          <div className="text-gray-500 text-sm order-2 md:order-1">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-gray-700">PIOS </span>— tous droits réservés
            </p>
          </div>
          <div className="text-gray-700 text-sm order-1 md:order-2">
            <span className="font-medium">Plateforme d&apos;Information et d&apos;Orientation scolaire</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 