"use client";

import Link from "next/link";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <div className="relative h-[90vh] md:h-[95vh] min-h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_right_-100px] md:bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2560&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#142948] via-[#142948]/80 md:via-[#142948]/70 to-[#142948]/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142948] via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start pt-16">
        <Link
          href="/bourses"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs mb-6 md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Nouvelles bourses disponibles. Lis plus →
        </Link>

        <h1 className="text-4xl sm:text-6xl md:text-8xl max-w-4xl text-white mb-6 md:mb-8 leading-[1.1] tracking-tighter">
          Bienvenue sur PIOS,
          <br />
          <span className="text-blue-400">guide vers l&apos;avenir</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 md:mb-12 leading-relaxed">
          Explorez les meilleures opportunités d&apos;études, bourses et trouvez
          l&apos;université qui vous convient au Niger.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-5 w-full sm:w-auto">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white rounded-full text-base md:text-lg shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          >
            Voir les filières
          </button>
          <Link
            href="/universites"
            className="inline-flex w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-base md:text-lg items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95"
          >
            Voir les universités <span className="text-xl md:text-2xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}