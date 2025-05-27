
export const typeOptions = ["Gouvernementale", "Internationale", "Privée", "Universitaire"]
export const locationOptions = ["Asie", "Europe", "Amérique", "Afrique", "Océanie","Niger"]
export const coverageOptions = ["100%", "75%", "50%", "25%"]
export const durationOptions = ["1 an", "2 ans", "3 ans", "Cycle complet"]
export const levelOptions = ["Licence", "Master", "Doctorat"]

export interface Scholarship {
    id: string
    name: string
    type: "Gouvernementale" | "Internationale" | "Privée" | "Universitaire"
    country: string
    coverage: string
    duration: string
    levels: string[]
    shortDescription: string
    fullDescription: string
    eligibilityRequirements: string[]
    applicationProcess: string[]
    requiredDocuments: string[]
    applicationDeadline?: string
    contactInfo: {
      email?: string
      phone?: string
      website?: string
      address?: string
    }
    partnerUniversities?: string[]
    testimonials?: string[]
    availableSpots?: number
    additionalNotes?: string
  }
  
  export const scholarships: Scholarship[] = [
    {
      id: "bourse-excellence-niger",
      name: "Bourse d'Excellence du Niger",
      type: "Gouvernementale",
      country: "Niger",
      coverage: "100%",
      duration: "Cycle complet",
      levels: ["Licence", "Master", "Doctorat"],
      shortDescription: "Bourse gouvernementale pour les meilleurs étudiants nigériens.",
      fullDescription:
        "La Bourse d'Excellence du Niger est un programme gouvernemental destiné à soutenir les étudiants nigériens les plus méritants dans leurs études supérieures. Cette bourse couvre l'intégralité des frais de scolarité, les frais de subsistance et les frais de transport pour les études au Niger ou à l'étranger.",
      eligibilityRequirements: [
        "Être de nationalité nigérienne",
        "Avoir obtenu le baccalauréat avec mention Très Bien",
        "Moyenne générale supérieure à 16/20",
        "Âge maximum de 25 ans pour la licence, 30 ans pour le master, 35 ans pour le doctorat",
        "Engagement à servir l'État nigérien pendant 5 ans après l'obtention du diplôme",
      ],
      applicationProcess: [
        "Retirer le dossier au Ministère de l'Enseignement Supérieur",
        "Constituer le dossier complet avec tous les documents requis",
        "Déposer le dossier avant la date limite",
        "Passer l'entretien de sélection",
        "Attendre les résultats de la commission de sélection",
      ],
      requiredDocuments: [
        "Acte de naissance",
        "Certificat de nationalité",
        "Relevés de notes du baccalauréat",
        "Certificat médical",
        "Lettre de motivation",
        "Projet d'études",
        "Engagement de service à l'État",
      ],
      applicationDeadline: "30 juin de chaque année",
      contactInfo: {
        email: "bourses@mess.gov.ne",
        phone: "+227 20 72 35 46",
        website: "www.mess.gov.ne",
        address: "Ministère de l'Enseignement Supérieur, Niamey, Niger",
      },
      availableSpots: 50,
      additionalNotes:
        "Les bénéficiaires de cette bourse s'engagent à servir l'État nigérien pendant une durée équivalente à celle de leurs études.",
    },
    {
      id: "bourse-france-niger",
      name: "Bourse d'Excellence France-Niger",
      type: "Internationale",
      country: "France",
      coverage: "100%",
      duration: "2 ans",
      levels: ["Master", "Doctorat"],
      shortDescription: "Programme de bourses pour études supérieures en France.",
      fullDescription:
        "Le programme de Bourses d'Excellence France-Niger est une initiative de coopération entre la France et le Niger pour permettre aux meilleurs étudiants nigériens de poursuivre leurs études supérieures dans les universités françaises. Cette bourse couvre tous les frais liés aux études et à la vie en France.",
      eligibilityRequirements: [
        "Être de nationalité nigérienne",
        "Avoir un niveau licence pour le master, master pour le doctorat",
        "Moyenne générale supérieure à 14/20",
        "Maîtrise du français (niveau B2 minimum)",
        "Projet d'études cohérent avec les priorités de développement du Niger",
      ],
      applicationProcess: [
        "Candidature en ligne sur Campus France",
        "Constitution du dossier académique",
        "Entretien à l'Ambassade de France",
        "Sélection par la commission mixte",
        "Préparation du départ (visa, logement)",
      ],
      requiredDocuments: [
        "Diplômes et relevés de notes traduits",
        "Lettre de motivation en français",
        "Projet d'études détaillé",
        "Lettres de recommandation",
        "Certificat de niveau de français",
        "CV détaillé",
      ],
      applicationDeadline: "31 mars de chaque année",
      contactInfo: {
        email: "bourses@ambafrance-ne.org",
        phone: "+227 20 72 24 31",
        website: "www.niger.campusfrance.org",
        address: "Ambassade de France au Niger, Niamey",
      },
      partnerUniversities: [
        "Université de Paris-Saclay",
        "Université de Bordeaux",
        "Université de Lyon",
        "École Polytechnique",
        "Sciences Po Paris",
      ],
      availableSpots: 25,
      testimonials: [
        "Cette bourse m'a permis de réaliser mon rêve d'étudier l'ingénierie en France. - Amadou, promotion 2022",
      ],
    },
    {
      id: "bourse-maroc-niger",
      name: "Bourse de Coopération Maroc-Niger",
      type: "Internationale",
      country: "Maroc",
      coverage: "75%",
      duration: "3 ans",
      levels: ["Licence", "Master"],
      shortDescription: "Programme de bourses pour études au Maroc dans le cadre de la coopération Sud-Sud.",
      fullDescription:
        "La Bourse de Coopération Maroc-Niger s'inscrit dans le cadre de la coopération Sud-Sud entre le Royaume du Maroc et la République du Niger. Elle vise à renforcer les capacités des jeunes nigériens dans divers domaines prioritaires pour le développement du Niger.",
      eligibilityRequirements: [
        "Être de nationalité nigérienne",
        "Avoir le baccalauréat pour la licence, la licence pour le master",
        "Moyenne générale supérieure à 12/20",
        "Âge maximum de 23 ans pour la licence, 28 ans pour le master",
        "Bonne connaissance du français ou de l'arabe",
      ],
      applicationProcess: [
        "Retrait du dossier à l'Ambassade du Maroc",
        "Constitution et dépôt du dossier complet",
        "Examen des dossiers par la commission",
        "Entretien pour les candidats présélectionnés",
        "Publication des résultats et préparation du départ",
      ],
      requiredDocuments: [
        "Formulaire de candidature dûment rempli",
        "Copies certifiées des diplômes",
        "Relevés de notes des trois dernières années",
        "Certificat médical",
        "Lettre de motivation",
        "Engagement de retour au Niger",
      ],
      applicationDeadline: "15 mai de chaque année",
      contactInfo: {
        email: "bourses@amb-maroc.ne",
        phone: "+227 20 75 36 20",
        website: "www.ambassade-maroc.ne",
        address: "Ambassade du Royaume du Maroc, Niamey, Niger",
      },
      partnerUniversities: [
        "Université Mohammed V de Rabat",
        "Université Hassan II de Casablanca",
        "Université Cadi Ayyad de Marrakech",
        "École Mohammadia d'Ingénieurs",
      ],
      availableSpots: 40,
    },
    {
      id: "bourse-canada-niger",
      name: "Bourse du Commonwealth Canada-Niger",
      type: "Internationale",
      country: "Canada",
      coverage: "100%",
      duration: "2 ans",
      levels: ["Master"],
      shortDescription: "Bourse pour études de master au Canada dans le cadre du Commonwealth.",
      fullDescription:
        "La Bourse du Commonwealth Canada-Niger offre aux étudiants nigériens l'opportunité de poursuivre des études de master dans les universités canadiennes. Ce programme vise à développer les compétences nécessaires pour contribuer au développement économique et social du Niger.",
      eligibilityRequirements: [
        "Être citoyen nigérien résidant au Niger",
        "Avoir un diplôme de licence avec mention",
        "Au moins 2 ans d'expérience professionnelle",
        "Maîtrise de l'anglais (IELTS 6.5 minimum) ou du français",
        "Engagement à retourner au Niger après les études",
      ],
      applicationProcess: [
        "Candidature en ligne sur le portail du Commonwealth",
        "Soumission des documents requis",
        "Évaluation académique et professionnelle",
        "Entretien avec la commission de sélection",
        "Préparation du départ et obtention du visa",
      ],
      requiredDocuments: [
        "Formulaire de candidature en ligne",
        "Diplômes et relevés de notes traduits",
        "Certificat de compétence linguistique",
        "Lettres de recommandation professionnelles",
        "Plan de développement professionnel",
        "Engagement de retour",
      ],
      applicationDeadline: "1er décembre de chaque année",
      contactInfo: {
        email: "info@cscuk.org.uk",
        website: "www.cscuk.org.uk",
        address: "Commonwealth Scholarship Commission, London, UK",
      },
      partnerUniversities: [
        "Université de Toronto",
        "Université McGill",
        "Université de Montréal",
        "Université de la Colombie-Britannique",
      ],
      availableSpots: 15,
    },
    {
      id: "bourse-banque-mondiale",
      name: "Programme de Bourses de la Banque Mondiale",
      type: "Internationale",
      country: "Divers",
      coverage: "100%",
      duration: "2 ans",
      levels: ["Master"],
      shortDescription: "Bourses pour études dans des domaines prioritaires pour le développement.",
      fullDescription:
        "Le Programme de Bourses de la Banque Mondiale soutient les professionnels des pays en développement dans l'acquisition de compétences avancées nécessaires pour contribuer au développement économique et social de leur pays. Les études peuvent se dérouler dans diverses universités partenaires à travers le monde.",
      eligibilityRequirements: [
        "Être citoyen d'un pays éligible (incluant le Niger)",
        "Avoir au moins 3 ans d'expérience professionnelle",
        "Diplôme de licence dans un domaine pertinent",
        "Démontrer un potentiel de leadership",
        "Engagement à retourner dans son pays d'origine",
      ],
      applicationProcess: [
        "Candidature en ligne sur le site de la Banque Mondiale",
        "Sélection du programme d'études et de l'université",
        "Évaluation par l'université partenaire",
        "Entretien final avec la Banque Mondiale",
        "Préparation du départ et suivi du programme",
      ],
      requiredDocuments: [
        "Formulaire de candidature complet",
        "CV détaillé",
        "Diplômes et relevés de notes",
        "Lettres de recommandation",
        "Essai sur les objectifs de carrière",
        "Preuve d'expérience professionnelle",
      ],
      applicationDeadline: "Variable selon le programme",
      contactInfo: {
        email: "scholarships@worldbank.org",
        website: "www.worldbank.org/scholarships",
      },
      partnerUniversities: [
        "Universités aux États-Unis",
        "Universités en Europe",
        "Universités en Australie",
        "Universités au Japon",
      ],
      availableSpots: 10,
    },
    {
      id: "bourse-uam",
      name: "Bourse de Mérite UAM",
      type: "Universitaire",
      country: "Niger",
      coverage: "50%",
      duration: "1 an",
      levels: ["Licence", "Master"],
      shortDescription: "Bourse de mérite de l'Université Abdou Moumouni pour les étudiants excellents.",
      fullDescription:
        "La Bourse de Mérite de l'Université Abdou Moumouni récompense les étudiants qui se distinguent par leurs excellents résultats académiques. Cette bourse vise à encourager l'excellence et à soutenir les étudiants méritants dans la poursuite de leurs études.",
      eligibilityRequirements: [
        "Être inscrit à l'Université Abdou Moumouni",
        "Moyenne générale supérieure à 15/20",
        "Assiduité aux cours et examens",
        "Pas de redoublement",
        "Situation sociale nécessitant un soutien financier",
      ],
      applicationProcess: [
        "Retrait du formulaire au service des bourses de l'UAM",
        "Constitution du dossier avec pièces justificatives",
        "Dépôt du dossier dans les délais",
        "Examen par la commission des bourses",
        "Publication des résultats et versement de la bourse",
      ],
      requiredDocuments: [
        "Formulaire de demande de bourse",
        "Relevés de notes de l'année précédente",
        "Certificat de scolarité",
        "Attestation de revenus des parents",
        "Lettre de motivation",
      ],
      applicationDeadline: "30 septembre de chaque année",
      contactInfo: {
        email: "bourses@uam.ne",
        phone: "+227 20 73 31 79",
        website: "www.uam.ne",
        address: "Université Abdou Moumouni, BP 10896, Niamey, Niger",
      },
      availableSpots: 100,
    },
    {
      id: "bourse-total-niger",
      name: "Bourse TotalEnergies Niger",
      type: "Privée",
      country: "Niger",
      coverage: "75%",
      duration: "3 ans",
      levels: ["Licence"],
      shortDescription: "Programme de bourses de TotalEnergies pour les études en géosciences et ingénierie.",
      fullDescription:
        "La Bourse TotalEnergies Niger s'adresse aux jeunes nigériens souhaitant poursuivre des études dans les domaines des géosciences, de l'ingénierie pétrolière, ou des énergies renouvelables. Ce programme vise à former la prochaine génération de professionnels du secteur énergétique au Niger.",
      eligibilityRequirements: [
        "Être de nationalité nigérienne",
        "Avoir obtenu le baccalauréat scientifique (C, D, E)",
        "Moyenne au baccalauréat supérieure à 14/20",
        "Âge maximum de 20 ans",
        "Intérêt démontré pour le secteur énergétique",
      ],
      applicationProcess: [
        "Candidature en ligne sur le site de TotalEnergies Niger",
        "Test de sélection écrit",
        "Entretien avec le comité de sélection",
        "Visite médicale",
        "Signature du contrat de bourse",
      ],
      requiredDocuments: [
        "Formulaire de candidature en ligne",
        "Copie du baccalauréat et relevés de notes",
        "Acte de naissance",
        "Lettre de motivation",
        "Projet professionnel",
        "Certificat médical",
      ],
      applicationDeadline: "31 juillet de chaque année",
      contactInfo: {
        email: "bourses@totalenergies.ne",
        phone: "+227 20 72 28 50",
        website: "www.totalenergies.ne",
        address: "TotalEnergies Niger, Niamey, Niger",
      },
      partnerUniversities: ["Université Abdou Moumouni", "École des Mines de l'Industrie et de la Géologie"],
      availableSpots: 20,
      additionalNotes:
        "Les bénéficiaires s'engagent à effectuer des stages chez TotalEnergies et à considérer un emploi dans l'entreprise après leurs études.",
    },
    {
      id: "bourse-allemagne-daad",
      name: "Bourse DAAD Allemagne",
      type: "Internationale",
      country: "Allemagne",
      coverage: "100%",
      duration: "2 ans",
      levels: ["Master", "Doctorat"],
      shortDescription: "Programme de bourses du DAAD pour études supérieures en Allemagne.",
      fullDescription:
        "Le Service Allemand d'Échanges Universitaires (DAAD) offre des bourses aux étudiants nigériens pour poursuivre des études de master ou de doctorat dans les universités allemandes. Ce programme couvre tous les frais d'études et de subsistance en Allemagne.",
      eligibilityRequirements: [
        "Diplôme de licence pour le master, master pour le doctorat",
        "Excellents résultats académiques",
        "Connaissance de l'allemand (niveau B2) ou de l'anglais selon le programme",
        "Expérience professionnelle pertinente",
        "Motivation claire pour étudier en Allemagne",
      ],
      applicationProcess: [
        "Candidature en ligne sur le portail DAAD",
        "Soumission des documents traduits et certifiés",
        "Évaluation académique",
        "Entretien (en personne ou en ligne)",
        "Préparation linguistique et culturelle",
      ],
      requiredDocuments: [
        "Formulaire de candidature DAAD",
        "Diplômes et relevés de notes traduits",
        "Lettres de recommandation académiques",
        "Lettre de motivation en allemand ou anglais",
        "Certificat de compétence linguistique",
        "CV académique détaillé",
      ],
      applicationDeadline: "31 octobre de chaque année",
      contactInfo: {
        email: "info@daad.de",
        website: "www.daad.de",
        address: "DAAD, Bonn, Allemagne",
      },
      partnerUniversities: [
        "Université Technique de Munich",
        "Université de Heidelberg",
        "Université Humboldt de Berlin",
        "Université de Fribourg",
      ],
      availableSpots: 12,
    },
  ]
  