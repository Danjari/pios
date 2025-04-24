export interface Filiere {
  id: string
  title?: string
  nomDeFiliere?: string
  category?: string
  Categorie?: "Engenieurie" | "Administration" | "Technologie" | "Agriculture" | "Science Sociale" | "Science de la Terre" | null
  duration?: string
  bacRequired?: string[]
  locations?: ("Niamey" | "Maradi" | "Zinder" | "Tahoua" | "Agadez" | "Dosso" | "Diffa" | "Tillabéri")[] | null
  fullDescription?: string
  longDescription_html?: string | null
  prerequisites?: { item?: string | null; id?: string | null }[] | null
  careerOpportunities?: string[]
  universities?: { name: string; location: string }[]
  salaireMoyen?: string | null
  slug?: string
  descriptionCourte?: string
  updatedAt?: string
  createdAt?: string
  shortDescription?: string
} 