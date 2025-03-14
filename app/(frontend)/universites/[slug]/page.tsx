import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// Fetch data from API
async function fetchUniversityBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/universites/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch university");
    const data = await res.json();
    return data.success ? data.university : null;
  } catch (error) {
    console.error("Error fetching university:", error);
    return null;
  }
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params to properly extract slug
  const { slug } = await params;

  const university = await fetchUniversityBySlug(slug);

  if (!university) {
    return notFound();
  }

  return (
    <div className="relative min-h-screen text-black flex items-start justify-center mt-20 px-4 sm:px-8">
      {/* Background with Radial Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* University Logo and Title */}
        <div className="flex items-center mb-6">
          {university.logo && (
            <Image
              src={university.logo.url}
              alt={university.nomDeLUniversite}
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
          )}
          <h1 className="text-3xl sm:text-4xl font-bold">{university.nomDeLUniversite}</h1>
        </div>

        {/* University Details */}
        <p className="text-sm text-blue-500 mb-4">{university.region}</p>
        <p className="bg-blue-50 border-l-4 border-blue-500 text-gray-700 text-base mb-6 p-4">
          {university.description || "No description available"}
        </p>

        {/* Long Description */}
        <div className="prose mb-8">
          <div
            dangerouslySetInnerHTML={{
              __html: university.longDescription_html || "",
            }}
          />
        </div>

        {/* Optional Link to return to the list of universities */}
        <div className="text-center">
          <Link href="/universites" className="text-blue-500 hover:text-blue-700">
            Retour aux universités
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const university = await fetchUniversityBySlug(slug);

  if (!university) {
    return {
      title: "Université non trouvée",
      description: "Cette université n'existe pas.",
    };
  }

  return {
    title: university.nomDeLUniversite,
    description: university.longDescription_html?.slice(0, 160) || "Détails sur l'université.",
  };
}