import Link from "next/link";

type IconVariant = "top-filled" | "mid-filled" | "bot-filled" | "multi-stack";

const AbstractIcon = ({
  className = "w-6 h-6",
  variant = "top-filled",
}: {
  className?: string;
  variant?: IconVariant;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {variant === "top-filled" && (
        <>
          <path
            d="M12 2L3 7L12 12L21 7L12 2Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M3 12L12 17L21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 17L12 22L21 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {variant === "mid-filled" && (
        <>
          <path
            d="M12 2L3 7L12 12L21 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12L12 17L21 12L12 7L3 12Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M3 17L12 22L21 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {variant === "bot-filled" && (
        <>
          <path
            d="M3 7L12 2L21 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12L12 7L21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12L3 17L12 22L21 17L12 12Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </>
      )}
      {variant === "multi-stack" && (
        <>
          <path
            d="M12 2L3 6L12 10L21 6L12 2Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M3 10L12 14L21 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 14L12 18L21 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18L12 22L21 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[240px]">
      {/* Bourses Feature - Large */}
      <div className="md:col-span-2 md:row-span-2 rounded-[2rem] md:rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 p-8 md:p-10 flex flex-col justify-between overflow-hidden relative group shadow-sm hover:shadow-xl transition-all duration-500 min-h-[320px] md:min-h-0">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl text-[#142948] mb-4 md:mb-6 max-w-md leading-tight">
            Accède à des bourses qui changent ton avenir.
          </h2>
          <p className="text-gray-600 max-w-sm mb-6 md:mb-10 text-base md:text-lg leading-relaxed">
            Découvre les bourses gouvernementales, privées et internationales
            avec jusqu&apos;à 100% de prise en charge.
          </p>
          <Link
            href="/bourses"
            className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Voir les bourses
          </Link>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 opacity-10">
          <AbstractIcon
            variant="top-filled"
            className="w-48 h-48 md:w-64 md:h-64 text-blue-600"
          />
        </div>
      </div>

      {/* Programs Summary */}
      <div className="md:col-span-1 md:row-span-1 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-100 p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow py-10 md:py-8">
        <span className="text-5xl md:text-6xl text-blue-600 mb-2 leading-none">
          500+
        </span>
        <h3 className="text-[#142948] text-lg md:text-xl">
          filières disponibles
        </h3>
        <p className="text-gray-500 text-sm mt-2 md:mt-3">
          Adaptés à votre profil et bac.
        </p>
      </div>

      {/* Universities Explorer */}
      <div className="md:col-span-1 md:row-span-2 rounded-[2rem] md:rounded-[2.5rem] bg-[#142948] p-8 md:p-10 flex flex-col justify-end overflow-hidden relative group shadow-xl min-h-[300px] md:min-h-0">
        <div className="absolute top-8 left-8 md:top-10 md:left-10">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <AbstractIcon
              variant="multi-stack"
              className="w-7 h-7 md:w-8 md:h-8 text-blue-400"
            />
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3">
            Explore les universités au Niger.
          </h3>
          <p className="text-gray-400 text-sm mb-6 md:mb-8 leading-relaxed">
            Compare les offres, conditions d&apos;accès, infrastructures, et
            plus.
          </p>
          <Link
            href="/universites"
            className="inline-flex justify-center items-center w-full py-3 md:py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white transition-all text-sm"
          >
            Explorer les universités
          </Link>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
      </div>

      {/* Category: Science */}
      <Link
        href="/filieres"
        className="md:col-span-1 md:row-span-1 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-100 p-6 md:p-8 flex flex-col justify-between hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm group min-h-[140px] md:min-h-0"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <AbstractIcon variant="top-filled" className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-[#142948] text-lg">Sciences &amp; Tech</h4>
          <span className="text-gray-400 text-sm">150+ programmes</span>
        </div>
      </Link>

      {/* Category: Humanities */}
      <Link
        href="/filieres"
        className="md:col-span-1 md:row-span-1 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-100 p-6 md:p-8 flex flex-col justify-between hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm group min-h-[140px] md:min-h-0"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <AbstractIcon variant="mid-filled" className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-[#142948] text-lg">Sciences Humaines</h4>
          <span className="text-gray-400 text-sm">120+ programmes</span>
        </div>
      </Link>

      {/* Category: Business */}
      <Link
        href="/filieres"
        className="md:col-span-1 md:row-span-1 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-100 p-6 md:p-8 flex flex-col justify-between hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm group min-h-[140px] md:min-h-0"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <AbstractIcon variant="bot-filled" className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="text-[#142948] text-lg">Commerce &amp; Gestion</h4>
          <span className="text-gray-400 text-sm">100+ programmes</span>
        </div>
      </Link>
    </div>
  );
}


