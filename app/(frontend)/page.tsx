"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center  px-4 sm:px-8">
      {/* Background Gradient */}
      <div className="max-w-4xl mx-auto relative z-10 text-center py-32">
        {/* Hero Text with Gradient */}
        <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-slate-400 mb-6">
          Bienvenue sur PIOS, votre guide vers l&apos;avenir
        </h1>
        <p className="text-lg sm:text-xl text-black mb-8">
          Explorez les meilleures opportunités d&apos;études et trouvez l&apos;université qui vous convient.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center gap-6">
          <Link href="/filieres">
          <button className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">
              Voir les filières
            </button>
          </Link>
          <Link href="/universites">
            <button className="  py-3 px-4 text-sm/6 text-grey-900  font-semibold">
              Voir les universités<span aria-hidden="true">→</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Optional Background Shapes (or keep this simple without them) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1E3A8A] to-[#2563EB] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}