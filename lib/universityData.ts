export interface Program {
    id: string
    name: string
  }
  
  export interface TuitionFee {
    program: string
    amount: string
  }
  
  export interface University {
    id: string
    name: string
    type: string
    city: string
    country: string
    educationSystem: string
    graduatesCount: number
    logo?: string
    bannerImage?: string
    motto?: string
    cycleDuration: string[]
    programs: Program[]
    academicResults: string
    admissionRequirements: string[]
    tuitionFees: TuitionFee[]
    accreditations: string
    authorization: string
    campusResources: string[]
    partners: string[]
    studentActivities: string[]
    clubs: string[]
    gallery: {
      src: string
      alt: string
      caption?: string
    }[]
    videos?: {
      src: string
      title: string
    }[]
  }
  
  export const universities: University[] = [
    {
      id: "uam",
      name: "Université Abdou Moumouni",
      type: "Publique",
      city: "Niamey",
      country: "Niger",
      educationSystem: "LMD (Licence-Master-Doctorat)",
      graduatesCount: 45000,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Savoir, Intégrité, Excellence",
      cycleDuration: ["Licence: 3 ans", "Master: 2 ans", "Doctorat: 3 ans minimum"],
      programs: [
        { id: "informatique", name: "Informatique" },
        { id: "gestion", name: "Gestion d'Entreprise" },
        { id: "agronomie", name: "Agronomie" },
        { id: "medecine", name: "Médecine" },
        { id: "sociologie", name: "Sociologie" },
      ],
      academicResults: "Taux de réussite moyen de 78% sur les 5 dernières années",
      admissionRequirements: [
        "Baccalauréat ou équivalent",
        "Concours d'entrée pour certaines filières",
        "Dossier académique pour les Masters",
      ],
      tuitionFees: [
        { program: "Licence", amount: "50 000 FCFA/an" },
        { program: "Master", amount: "75 000 FCFA/an" },
        { program: "Doctorat", amount: "100 000 FCFA/an" },
      ],
      accreditations: "Reconnue par le Ministère de l'Enseignement Supérieur du Niger et le CAMES",
      authorization: "Établie par décret présidentiel n°2001-56 du 28 mars 2001",
      campusResources: [
        "Bibliothèque universitaire avec plus de 50 000 ouvrages",
        "Laboratoires informatiques",
        "Connexion internet haut débit",
        "Résidences universitaires",
        "Restaurant universitaire",
        "Terrains de sport",
      ],
      partners: [
        "Université de Paris-Saclay",
        "Université de Montréal",
        "Université Cheikh Anta Diop de Dakar",
        "UNESCO",
        "Banque Mondiale",
      ],
      studentActivities: [
        "Compétitions sportives interuniversitaires",
        "Festivals culturels",
        "Conférences et séminaires",
        "Journées portes ouvertes",
      ],
      clubs: [
        "Club d'informatique",
        "Association des étudiants en médecine",
        "Club d'entrepreneuriat",
        "Club de débat",
        "Association sportive",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Campus principal",
          caption: "Vue du campus principal",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Bibliothèque",
          caption: "Bibliothèque universitaire",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Laboratoire",
          caption: "Laboratoire de recherche",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Cérémonie de remise des diplômes",
          caption: "Cérémonie de remise des diplômes 2023",
        },
      ],
      videos: [
        {
          src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          title: "Présentation de l'université",
        },
      ],
    },
    {
      id: "emig",
      name: "École des Mines, de l'Industrie et de la Géologie",
      type: "Publique",
      city: "Niamey",
      country: "Niger",
      educationSystem: "Système d'ingénierie",
      graduatesCount: 12000,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Former pour transformer",
      cycleDuration: ["Cycle préparatoire: 2 ans", "Cycle ingénieur: 3 ans"],
      programs: [
        { id: "genie-civil", name: "Génie Civil" },
        { id: "genie-electrique", name: "Génie Électrique" },
        { id: "genie-minier", name: "Génie Minier" },
        { id: "geologie", name: "Géologie" },
      ],
      academicResults: "Plus de 90% d'insertion professionnelle dans les 6 mois suivant l'obtention du diplôme",
      admissionRequirements: [
        "Baccalauréat scientifique (C, D, E) ou technique (F1, F2)",
        "Concours d'entrée très sélectif",
        "Entretien de motivation",
      ],
      tuitionFees: [
        { program: "Cycle préparatoire", amount: "750 000 FCFA/an" },
        { program: "Cycle ingénieur", amount: "950 000 FCFA/an" },
      ],
      accreditations: "Reconnue par le CAMES et plusieurs organismes internationaux d'accréditation d'ingénierie",
      authorization: "Établie par décret présidentiel n°1987-22 du 12 janvier 1987",
      campusResources: [
        "Laboratoires spécialisés en génie civil, électrique et minier",
        "Centre de documentation technique",
        "Ateliers de pratique",
        "Équipements de pointe pour la géologie",
        "Résidence étudiante sur le campus",
      ],
      partners: [
        "École des Mines de Paris",
        "Polytechnique Montréal",
        "Entreprises minières du Niger",
        "AREVA",
        "Société Nigérienne d'Électricité",
      ],
      studentActivities: [
        "Visites techniques sur sites industriels et miniers",
        "Challenges d'innovation",
        "Journées scientifiques",
        "Tournois sportifs",
      ],
      clubs: [
        "Club robotique",
        "Association des élèves ingénieurs",
        "Club environnement",
        "Club d'entrepreneuriat technique",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Bâtiment principal",
          caption: "Bâtiment principal de l'EMIG",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Laboratoire de génie civil",
          caption: "Laboratoire de génie civil",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Travaux pratiques",
          caption: "Étudiants en travaux pratiques",
        },
      ],
    },
    {
      id: "ipdr",
      name: "Institut Pratique de Développement Rural",
      type: "Publique",
      city: "Kollo",
      country: "Niger",
      educationSystem: "Formation professionnelle agricole",
      graduatesCount: 8500,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Nourrir le Niger par l'excellence agricole",
      cycleDuration: ["Technicien supérieur: 2 ans", "Ingénieur des techniques: 3 ans"],
      programs: [
        { id: "production-vegetale", name: "Production Végétale" },
        { id: "production-animale", name: "Production Animale" },
        { id: "genie-rural", name: "Génie Rural" },
        { id: "eaux-forets", name: "Eaux et Forêts" },
      ],
      academicResults: "Taux de réussite de 85% et forte employabilité dans le secteur agricole",
      admissionRequirements: ["Baccalauréat scientifique ou agricole", "Test d'entrée", "Entretien de motivation"],
      tuitionFees: [
        { program: "Technicien supérieur", amount: "350 000 FCFA/an" },
        { program: "Ingénieur des techniques", amount: "450 000 FCFA/an" },
      ],
      accreditations: "Reconnue par le Ministère de l'Agriculture et le Ministère de l'Enseignement Supérieur",
      authorization: "Établie par décret n°1989-45 du 18 avril 1989",
      campusResources: [
        "Ferme expérimentale de 50 hectares",
        "Laboratoires d'analyse des sols et des plantes",
        "Centre de documentation agricole",
        "Unités d'élevage pédagogiques",
        "Équipements agricoles modernes",
      ],
      partners: [
        "FAO",
        "ICRISAT",
        "Ministère de l'Agriculture",
        "Coopération française",
        "Organisations paysannes du Niger",
      ],
      studentActivities: [
        "Stages pratiques en milieu rural",
        "Projets d'entrepreneuriat agricole",
        "Foires agricoles",
        "Journées portes ouvertes",
      ],
      clubs: [
        "Club agro-écologie",
        "Association des étudiants en agriculture",
        "Club innovation agricole",
        "Club environnement",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Ferme expérimentale",
          caption: "Ferme expérimentale de l'IPDR",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Travaux pratiques agricoles",
          caption: "Étudiants en travaux pratiques",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Laboratoire",
          caption: "Laboratoire d'analyse des sols",
        },
      ],
    },
    {
      id: "iscae",
      name: "Institut Supérieur de Comptabilité et d'Administration des Entreprises",
      type: "Privée",
      city: "Niamey",
      country: "Niger",
      educationSystem: "LMD",
      graduatesCount: 5200,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Excellence, Rigueur, Professionnalisme",
      cycleDuration: ["Licence: 3 ans", "Master: 2 ans"],
      programs: [
        { id: "comptabilite", name: "Comptabilité et Audit" },
        { id: "finance", name: "Finance" },
        { id: "marketing", name: "Marketing et Communication" },
        { id: "gestion-rh", name: "Gestion des Ressources Humaines" },
      ],
      academicResults: "Plus de 75% des diplômés trouvent un emploi dans les 3 mois suivant l'obtention du diplôme",
      admissionRequirements: [
        "Baccalauréat toutes séries",
        "Étude de dossier",
        "Test d'admission",
        "Entretien de motivation",
      ],
      tuitionFees: [
        { program: "Licence", amount: "850 000 FCFA/an" },
        { program: "Master", amount: "1 200 000 FCFA/an" },
      ],
      accreditations: "Reconnue par le Ministère de l'Enseignement Supérieur et le CAMES",
      authorization: "Autorisation d'ouverture n°0125/MESS/R/SG/DGES du 15 septembre 2005",
      campusResources: [
        "Salles informatiques équipées de logiciels professionnels",
        "Bibliothèque spécialisée en gestion et comptabilité",
        "Connexion internet haut débit",
        "Salle de conférences",
        "Espace de coworking",
      ],
      partners: [
        "Ordre des Experts Comptables du Niger",
        "Chambre de Commerce du Niger",
        "Banques locales",
        "Grandes entreprises nigériennes",
        "Université de Bordeaux (France)",
      ],
      studentActivities: [
        "Séminaires professionnels",
        "Simulations d'entreprise",
        "Visites d'entreprises",
        "Challenges d'entrepreneuriat",
      ],
      clubs: [
        "Club des futurs entrepreneurs",
        "Association des étudiants en comptabilité",
        "Club finance",
        "Club marketing",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Campus ISCAE",
          caption: "Campus principal de l'ISCAE",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Salle informatique",
          caption: "Salle informatique moderne",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Conférence",
          caption: "Conférence avec des professionnels",
        },
      ],
    },
    {
      id: "fsante",
      name: "Faculté des Sciences de la Santé",
      type: "Publique",
      city: "Niamey",
      country: "Niger",
      educationSystem: "Système universitaire médical",
      graduatesCount: 3800,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Soigner, Enseigner, Chercher",
      cycleDuration: ["Médecine générale: 7 ans", "Spécialisation: 3-5 ans supplémentaires"],
      programs: [
        { id: "medecine", name: "Médecine" },
        { id: "pharmacie", name: "Pharmacie" },
        { id: "dentaire", name: "Médecine Dentaire" },
        { id: "sante-publique", name: "Santé Publique" },
      ],
      academicResults: "Taux de réussite aux examens nationaux de médecine: 82%",
      admissionRequirements: [
        "Baccalauréat scientifique (C ou D) avec mention",
        "Concours d'entrée très sélectif",
        "Entretien de motivation",
      ],
      tuitionFees: [
        { program: "Médecine", amount: "150 000 FCFA/an" },
        { program: "Pharmacie", amount: "150 000 FCFA/an" },
        { program: "Médecine Dentaire", amount: "175 000 FCFA/an" },
        { program: "Santé Publique", amount: "125 000 FCFA/an" },
      ],
      accreditations: "Reconnue par le Conseil Africain et Malgache pour l'Enseignement Supérieur (CAMES)",
      authorization: "Établie par décret présidentiel n°1994-132 du 7 novembre 1994",
      campusResources: [
        "Laboratoires d'anatomie et de physiologie",
        "Centre de simulation médicale",
        "Bibliothèque médicale",
        "Accès aux hôpitaux universitaires pour la formation clinique",
        "Centre de recherche en santé publique",
      ],
      partners: [
        "OMS",
        "Hôpital National de Niamey",
        "Faculté de Médecine de Dakar",
        "Université de Montréal",
        "Médecins Sans Frontières",
      ],
      studentActivities: [
        "Journées médicales",
        "Campagnes de sensibilisation sanitaire",
        "Conférences scientifiques",
        "Actions humanitaires",
      ],
      clubs: [
        "Association des étudiants en médecine",
        "Club de santé publique",
        "Association des futurs pharmaciens",
        "Club de recherche médicale",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Bâtiment de la faculté",
          caption: "Bâtiment principal de la Faculté des Sciences de la Santé",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Laboratoire",
          caption: "Laboratoire d'anatomie",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Étudiants en médecine",
          caption: "Étudiants en formation clinique",
        },
      ],
    },
    {
      id: "agrhymet",
      name: "Centre Régional AGRHYMET",
      type: "International",
      city: "Niamey",
      country: "Niger",
      educationSystem: "Formation professionnelle et Master",
      graduatesCount: 4200,
      logo: "/placeholder.svg?height=100&width=100",
      bannerImage: "/placeholder.svg?height=300&width=800",
      motto: "Former pour la sécurité alimentaire et la gestion durable des ressources naturelles",
      cycleDuration: ["Formation professionnelle: 1-2 ans", "Master: 2 ans"],
      programs: [
        { id: "agrometeo", name: "Agrométéorologie" },
        { id: "hydrologie", name: "Hydrologie" },
        { id: "protection-vegetaux", name: "Protection des Végétaux" },
        { id: "securite-alimentaire", name: "Sécurité Alimentaire et Gestion des Ressources Naturelles" },
      ],
      academicResults:
        "Reconnaissance internationale des diplômes et forte employabilité dans les organisations régionales",
      admissionRequirements: [
        "Licence ou équivalent dans un domaine pertinent",
        "Sélection sur dossier",
        "Maîtrise du français",
        "Lettre de recommandation",
      ],
      tuitionFees: [
        { program: "Formation professionnelle", amount: "Variable selon le pays d'origine" },
        { program: "Master", amount: "Variable selon le pays d'origine" },
      ],
      accreditations: "Reconnu par les pays membres du CILSS et les organisations internationales",
      authorization:
        "Établi en 1974 comme institution spécialisée du Comité permanent Inter-États de Lutte contre la Sécheresse dans le Sahel (CILSS)",
      campusResources: [
        "Station météorologique",
        "Laboratoires d'analyse des sols et des plantes",
        "Centre de télédétection et SIG",
        "Centre de documentation spécialisé",
        "Ferme expérimentale",
      ],
      partners: ["FAO", "Union Européenne", "Banque Mondiale", "USAID", "Météo-France"],
      studentActivities: [
        "Séminaires régionaux",
        "Projets de recherche appliquée",
        "Stages de terrain",
        "Conférences internationales",
      ],
      clubs: [
        "Club environnement",
        "Association des anciens du Centre AGRHYMET",
        "Club scientifique",
        "Réseau des experts en sécurité alimentaire",
      ],
      gallery: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Campus AGRHYMET",
          caption: "Vue aérienne du Centre AGRHYMET",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Station météo",
          caption: "Station météorologique du centre",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Formation",
          caption: "Session de formation en télédétection",
        },
      ],
    },
  ]
  