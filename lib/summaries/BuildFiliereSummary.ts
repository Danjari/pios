import { Filiere } from "@/payload-types";

export function buildFiliereSummary(filiere: Filiere): string {
  const prerequisitesList =
    filiere.prerequisites
      ?.map((p) => p.item)
      .filter((item): item is string => !!item)
      .join(", ") || "Non précisés.";

  const opportunitiesList =
    filiere.careerOpportunities
      ?.map((o) => o.item)
      .filter((item): item is string => !!item)
      .join(", ") || "Non précisés.";

  const universitiesList =
    filiere.universities
      ?.map((u) => {
        if (typeof u === "string") return u;
        if ("nomDeLUniversite" in u && u.nomDeLUniversite) return u.nomDeLUniversite; // adjust if your Universite type has a `nom` or `title` field
        return "";
      })
      .filter((name) => !!name)
      .join(", ") || "Non précisées.";

  return `
Filière: ${filiere.nomDeFiliere}

Catégorie: ${filiere.category}

Durée: ${filiere.duration}

Bac requis: ${filiere.bacRequired.join(", ")}

Lieux disponibles: ${filiere.locations?.join(", ") || "Non précisés."}

Description courte: ${filiere.descriptionCourte || "Non précisée."}

Description complète: ${filiere.longDescription_html || "Non précisée."}

Prérequis: ${prerequisitesList}

Débouchés (opportunités): ${opportunitiesList}

Universités proposées: ${universitiesList}
  `.trim();
}
