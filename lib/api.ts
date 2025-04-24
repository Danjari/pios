import { getPayload } from "payload";
import configPromise from "@payload-config"; // Ensure this matches your payload config import

// export async function fetchFilieres() {
//   const payload = await getPayload({ config: configPromise });

//   const { docs: filieres } = await payload.find({
//     collection: "filieres",
//     limit: 100,
//     sort: "-title",
//     select: {
//         nomDeFiliere: true,
//         slug: true,
//         Categorie: true,
//         salaireMoyen: true,
//         longDescription: true,
//     },
//   });

//   return filieres;
// }

export async function fetchFilieres() {
  const payload = await getPayload({ config: configPromise });

  const { docs: filieres } = await payload.find({
    collection: 'filieres',
    limit: 100,
    sort: '-nomDeFiliere',
    depth: 1, // get full data of related fields like universities
    select: {
      nomDeFiliere: true,
      slug: true,
      Categorie: true,
      salaireMoyen: true,
      descriptionCourte: true,
      duration: true,
      bacRequired: true,
      locations: true,
      prerequisites: true,
      careerOpportunities: true,
      longDescription: true,
      longDescription_html: true,
      universities: true, // include populated universities
    },
  });

  return filieres;
}


// // Fetch a single filiere by slug
// export async function fetchFiliereBySlug(slug: string) {
//     try {
//       const payload = await getPayload({ config: configPromise });
//       const result = await payload.find({
//         collection: "filieres",
//         where: { slug: { equals: slug } },
//         limit: 1,
//         pagination: false,
//       });
  
//       return result.docs?.[0] || null;
//     } catch (error) {
//       console.error("Error fetching filiere:", error);
//       return null;
//     }
//   }

export async function fetchFiliereBySlug(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: 'filieres',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1, // include related universities
      pagination: false,
    });

    return result.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching filiere:', error);
    return null;
  }
}



  export async function fetchUniversites() {
    const payload = await getPayload({ config: configPromise });
  
    const { docs: universites } = await payload.find({
      collection: "universites",
      limit: 100,
      sort: "nomDeLUniversite",
      select: {
        nomDeLUniversite: true,
        slug: true,
        region: true,
        logo: true,
        description: true,
        longDescription: true,
      },
    });
  
    return universites.map((uni) => ({
        ...uni,
        // ✅ Normalize `logo` so it always matches `{ url: string } | null | undefined`
        logo:
          typeof uni.logo === "string"
            ? { url: uni.logo }
            : uni.logo && "url" in uni.logo && uni.logo.url
            ? { url: uni.logo.url }
            : null,
      }));
  }

  export async function fetchUniversiteBySlug(slug: string) {
    try {
      const payload = await getPayload({ config: configPromise });
      const result = await payload.find({
        collection: "universites",
        where: { slug: { equals: slug } },
        limit: 1,
        pagination: false,
      });
  
      return result.docs?.[0] || null;
    } catch (error) {
      console.error("Error fetching universite:", error);
      return null;
    }
  }