//import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto w-full" aria-label="Site Footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left gap-2">
          <div className="text-gray-500 text-sm order-2 md:order-1">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Plateforme d&apos;Information et d&apos;Orientation scolaire</span> — tous droits réservés
            </p>
          </div>
          <div className="text-gray-700 text-sm order-1 md:order-2">
            <span className="font-medium">Une initiative du cabinet Iqra Orientation</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 