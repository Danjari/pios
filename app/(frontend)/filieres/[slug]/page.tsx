// app/(frontend)/filiere/[slug].tsx

import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

// Fetch data for a specific filiere
async function fetchFiliereBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "filieres",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    pagination: false,
  });

  return result.docs?.[0]; // Return the first matched filiere
}

export default async function FilierePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const filiere = await fetchFiliereBySlug(slug);

  if (!filiere) {
    return notFound(); // If no filiere found, return a 404
  }


  return (
      <article className="pt-16 pb-16 px-6 sm:px-8 md:px-12 max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4 sm:text-4xl">{filiere.nomDeFiliere}</h1>

        {/* Region and Salary */}
        <div className="flex justify-center space-x-6">
          <p className="text-sm text-blue-600">{filiere.region}</p>
          <p className="text-sm text-gray-600">{`Salaire: ${filiere.salaireMoyen}`}</p>
        </div>

        {/* Description */}
        <div className="prose mx-auto mt-8 text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: filiere.longDescription_html || "" }} />
        </div>
      </article>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const filiere = await fetchFiliereBySlug(slug);

  if (!filiere) {
    return {
      title: "Filiere Not Found",
      description: "This filiere could not be found.",
    };
  }

  return {
    title: filiere.nomDeFiliere,
    description: filiere.longDescription_html?.slice(0, 160) || "Filiere details.",
  };
}
