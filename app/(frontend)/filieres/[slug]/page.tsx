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
    <article className="pt-16 pb-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold text-center mb-4 sm:text-4xl">{filiere.nomDeFiliere}</h1>
  <p className="text-sm text-blue-500 text-center mb-2 sm:text-base">{filiere.region}</p>
  <p className="text-sm text-gray-700 text-center mb-8 sm:text-base">{`Salaire: ${filiere.salaireMoyen}`}</p>
  
  <div className="prose mx-auto mt-8">
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
