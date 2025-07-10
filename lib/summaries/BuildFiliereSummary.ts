import { Filiere } from "@/payload-types";


  
  export function buildFiliereSummary(filiere: Filiere): string {
    return `
  Filière: ${filiere.nomDeFiliere}
  
  Catégorie: ${filiere.category}
  
  Durée: ${filiere.duration}
  
  Bac requis: ${filiere.bacRequired.join(", ")}
  
  Lieux disponibles: ${filiere.locations?.join(", ")}
  
  Description courte: ${filiere.descriptionCourte || "Non précisée."}
  
  Description complète: ${filiere.longDescription || "Non précisée."}
  
  Prérequis: ${filiere.prerequisites || "Non précisés."}
  
  Débouchés (opportunités): ${filiere.careerOpportunities || "Non précisés."}
  
  Universités proposées: ${filiere.universities?.join(", ") || "Non précisées."}
  `.trim();
  }
  