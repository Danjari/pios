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
      category: true,
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
      updatedAt: true,
      createdAt: true,
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
    sort: "name",
    depth: 1,
  });

  return universites
}


  export async function fetchUniversiteBySlug(slug: string) {
    try {
      const payload = await getPayload({ config: configPromise });
  
      const result = await payload.find({
        collection: "universites",
        where: { slug: { equals: slug } },
        limit: 1,
        pagination: false,
        depth: 1,
      });
  
      const uni = result.docs?.[0];
  
      if (!uni) return null;
  
      return {
        ...uni,
        logo:
          typeof uni.logo === "string"
            ? { url: uni.logo }
            : uni.logo && "url" in uni.logo && uni.logo.url
            ? { url: uni.logo.url }
            : null,
        bannerImage:
          typeof uni.bannerImage === "string"
            ? { url: uni.bannerImage }
            : uni.bannerImage && "url" in uni.bannerImage && uni.bannerImage.url
            ? { url: uni.bannerImage.url }
            : null,
      };
    } catch (error) {
      console.error("Error fetching universite:", error);
      return null;
    }
  }
  



export async function fetchBourses() {
  const payload = await getPayload({ config: configPromise });

  const { docs: bourses } = await payload.find({
    collection: "bourses",
    limit: 100,
    sort: "name",
    depth: 1,
  });


  return bourses
}


  export async function fetchBourseBySlug(slug: string) {
    try {
      const payload = await getPayload({ config: configPromise });
  
      const result = await payload.find({
        collection: "bourses",
        where: { slug: { equals: slug } },
        limit: 1,
        pagination: false,
        depth: 1,
      });
  
      const bourse = result.docs?.[0];
  
      if (!bourse) return null;
  
      return bourse
    } catch (error) {
      console.error("Error fetching bourse:", error);
      return null;
    }
  }
  