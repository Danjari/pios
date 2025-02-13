import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// Fetch university data by slug
async function fetchUniversityBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "universites",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  return result.docs?.[0];  // Return the first matched university
}

export default async function UniversityPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const university = await fetchUniversityBySlug(slug);

  if (!university) {
    return notFound();  // If no university is found, show a 404
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