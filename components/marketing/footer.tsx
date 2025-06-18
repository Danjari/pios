import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} PIOS - Projet d&apos;Orientation Scolaire au Niger</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              À propos
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 