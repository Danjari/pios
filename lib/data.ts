export interface University {
    name: string
    location: string
  }
  
  export interface Filiere {
    id: string
    title: string
    category: string
    duration: string
    bacRequired: string[]
    locations: string[]
    shortDescription: string
    fullDescription: string
    prerequisites: string[]
    careerOpportunities: string[]
    universities: University[]
  }

  export const bacOptions = ['A',
    'C',
    'D',
    'E',
    'F1',
    'F2',
    'F3',
    'F4',
    'G1',
    'G2',
    'G3',
    'G4',
    "PRO"]
  export const type = ["Prive","Publique","Internationale"]
  export const categorieOptions = ['Technologie',
        'Économie',
        'Agriculture',
        'Santé',
        'Sciences sociales',
        'Art',
        'Sport',
        'Éducation',
        'Énergie',
        'Environnement',
        'Sciences industrielles',
        'Lettres et sciences humaines',
        'Aéronautique',
        'Aviation civile et militaire']
  export const localisationOptions = ['Niamey', 'Maradi', 'Zinder', 'Tahoua', 'Agadez', 'Dosso', 'Diffa', 'Tillabéri', 'Partout au Niger',
    'Extérieur']
  
  export const filieres: Filiere[] = [
    {
      id: "informatique",
      title: "Informatique",
      category: "Technologie",
      duration: "3 ans (Licence)",
      bacRequired: ["C", "D", "E", "F1"],
      locations: ["Niamey", "Maradi"],
      shortDescription: "Formation en développement logiciel, réseaux et systèmes d'information.",
      fullDescription:
        "La licence en Informatique offre une formation complète dans les domaines du développement logiciel, des réseaux informatiques, des bases de données et des systèmes d'information. Les étudiants acquièrent des compétences pratiques et théoriques leur permettant de concevoir, développer et maintenir des solutions informatiques pour divers secteurs d'activité.",
      prerequisites: [
        "Baccalauréat scientifique (C, D, E) ou technique (F1)",
        "Bonnes compétences en mathématiques",
        "Intérêt pour la résolution de problèmes",
        "Capacité d'analyse et de logique",
      ],
      careerOpportunities: [
        "Développeur de logiciels",
        "Administrateur de réseaux",
        "Analyste de données",
        "Consultant en systèmes d'information",
        "Technicien de support informatique",
        "Webmaster",
      ],
      universities: [
        {
          name: "Université Abdou Moumouni",
          location: "Niamey",
        },
        {
          name: "Institut Africain d'Informatique",
          location: "Niamey",
        },
        {
          name: "Université de Maradi",
          location: "Maradi",
        },
      ],
    },
    {
      id: "gestion",
      title: "Gestion d'Entreprise",
      category: "Économie",
      duration: "3 ans (Licence)",
      bacRequired: ["A", "D", "G1", "G2"],
      locations: ["Niamey", "Zinder", "Tahoua"],
      shortDescription: "Formation en management, comptabilité, marketing et ressources humaines.",
      fullDescription:
        "La licence en Gestion d'Entreprise forme les étudiants aux différentes fonctions de l'entreprise : management, comptabilité, marketing, ressources humaines et finance. Cette formation pluridisciplinaire permet d'acquérir les compétences nécessaires pour comprendre le fonctionnement global d'une organisation et participer à sa gestion efficace.",
      prerequisites: [
        "Baccalauréat A, D, G1 ou G2",
        "Intérêt pour le monde des affaires",
        "Bonnes capacités de communication",
        "Sens de l'organisation",
      ],
      careerOpportunities: [
        "Assistant de gestion",
        "Comptable",
        "Chargé de clientèle",
        "Assistant ressources humaines",
        "Assistant marketing",
        "Entrepreneur",
      ],
      universities: [
        {
          name: "Université Abdou Moumouni",
          location: "Niamey",
        },
        {
          name: "École Supérieure de Commerce et d'Administration",
          location: "Niamey",
        },
        {
          name: "Université de Zinder",
          location: "Zinder",
        },
        {
          name: "Université de Tahoua",
          location: "Tahoua",
        },
      ],
    },
    {
      id: "agronomie",
      title: "Agronomie",
      category: "Agriculture",
      duration: "4 ans (Licence + 1)",
      bacRequired: ["C", "D"],
      locations: ["Niamey", "Maradi", "Tahoua"],
      shortDescription: "Formation en sciences agricoles, production végétale et animale.",
      fullDescription:
        "La formation en Agronomie couvre les aspects scientifiques et techniques de l'agriculture, incluant la production végétale, l'élevage, la gestion des ressources naturelles et le développement rural. Les étudiants acquièrent des connaissances en biologie, chimie, écologie, économie agricole et techniques de production adaptées au contexte sahélien.",
      prerequisites: [
        "Baccalauréat scientifique (C ou D)",
        "Intérêt pour les sciences naturelles",
        "Sensibilité aux enjeux environnementaux",
        "Aptitude au travail de terrain",
      ],
      careerOpportunities: [
        "Ingénieur agronome",
        "Conseiller agricole",
        "Technicien en développement rural",
        "Responsable de production agricole",
        "Chercheur en agronomie",
        "Entrepreneur agricole",
      ],
      universities: [
        {
          name: "Faculté d'Agronomie de l'Université Abdou Moumouni",
          location: "Niamey",
        },
        {
          name: "Institut Pratique de Développement Rural",
          location: "Kollo",
        },
        {
          name: "Centre Régional AGRHYMET",
          location: "Niamey",
        },
      ],
    },
    {
      id: "medecine",
      title: "Médecine",
      category: "Santé",
      duration: "7 ans",
      bacRequired: ["C", "D"],
      locations: ["Niamey"],
      shortDescription: "Formation complète en sciences médicales pour devenir médecin.",
      fullDescription:
        "Les études de médecine forment les futurs médecins à travers un cursus complet alliant sciences fondamentales (anatomie, physiologie, biochimie) et formation clinique. Le programme comprend des cours théoriques, des travaux pratiques et des stages hospitaliers permettant d'acquérir les compétences nécessaires au diagnostic et au traitement des maladies.",
      prerequisites: [
        "Baccalauréat scientifique (C ou D) avec mention",
        "Excellentes notes en sciences",
        "Capacité de travail importante",
        "Résistance au stress",
        "Empathie et sens de l'écoute",
      ],
      careerOpportunities: [
        "Médecin généraliste",
        "Médecin spécialiste (après spécialisation)",
        "Médecin de santé publique",
        "Chercheur en médecine",
        "Médecin humanitaire",
      ],
      universities: [
        {
          name: "Faculté des Sciences de la Santé - Université Abdou Moumouni",
          location: "Niamey",
        },
      ],
    },
    {
      id: "sociologie",
      title: "Sociologie",
      category: "Sciences Sociales",
      duration: "3 ans (Licence)",
      bacRequired: ["A", "D"],
      locations: ["Niamey", "Maradi"],
      shortDescription: "Étude des phénomènes sociaux et des comportements collectifs.",
      fullDescription:
        "La licence en Sociologie forme les étudiants à l'analyse des phénomènes sociaux, des comportements collectifs et des interactions entre individus et groupes. Le programme aborde les théories sociologiques, les méthodes de recherche qualitatives et quantitatives, et l'étude des problématiques sociales contemporaines, avec une attention particulière aux réalités africaines et nigériennes.",
      prerequisites: [
        "Baccalauréat A ou D",
        "Intérêt pour les questions sociales",
        "Esprit critique et d'analyse",
        "Bonnes capacités rédactionnelles",
      ],
      careerOpportunities: [
        "Chargé d'études sociales",
        "Médiateur social",
        "Agent de développement local",
        "Conseiller en insertion sociale",
        "Chargé de projets dans les ONG",
        "Chercheur en sciences sociales",
      ],
      universities: [
        {
          name: "Faculté des Lettres et Sciences Humaines - Université Abdou Moumouni",
          location: "Niamey",
        },
        {
          name: "Université de Maradi",
          location: "Maradi",
        },
      ],
    },
    {
      id: "genie-civil",
      title: "Génie Civil",
      category: "Technologie",
      duration: "5 ans",
      bacRequired: ["C", "E", "F1", "F2"],
      locations: ["Niamey", "Maradi"],
      shortDescription: "Formation en conception et construction d'infrastructures et bâtiments.",
      fullDescription:
        "La formation en Génie Civil prépare les étudiants à concevoir, construire et entretenir des infrastructures comme les bâtiments, routes, ponts et barrages. Le programme combine des enseignements théoriques en mathématiques, physique et mécanique avec des applications pratiques en techniques de construction, matériaux, hydraulique et géotechnique.",
      prerequisites: [
        "Baccalauréat C, E, F1 ou F2",
        "Bonnes compétences en mathématiques et physique",
        "Sens de la précision",
        "Capacité à visualiser en 3D",
        "Aptitude au travail en équipe",
      ],
      careerOpportunities: [
        "Ingénieur en génie civil",
        "Conducteur de travaux",
        "Chef de chantier",
        "Ingénieur d'études",
        "Expert en bâtiment",
        "Urbaniste",
      ],
      universities: [
        {
          name: "École des Mines, de l'Industrie et de la Géologie (EMIG)",
          location: "Niamey",
        },
        {
          name: "Institut Supérieur de Technologie",
          location: "Maradi",
        },
      ],
    },
  ]
  