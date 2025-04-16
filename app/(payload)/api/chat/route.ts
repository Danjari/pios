// // using Gemini cause it is cheaper and still really good. 
// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenAI } from '@google/genai';

// const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY!});

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json();

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
//     }

//     // Convert to Gemini format
//     const formattedMessages = messages.map((msg: any) => ({
//       role: msg.role,
//       parts: [{ text: msg.content }],
//     }));

   

//     const result = await genAI.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: formattedMessages,
//     });

//     const text = result.text;

//     return NextResponse.json({ message: text });
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const systemPrompt = `Tu es un assistant intelligent et patient. Tu aides les lycéens nigériens à mieux comprendre leur orientation universitaire. Sois précis, clair, et encourageant.`;
    const documentText = `Context from orientation document: considere que tu connais la situations universitaire au Niger. voici quelque details oici une liste des universités au Niger avec des points forts et faibles potentiels. Veuillez noter que cette information peut ne pas être exhaustive et est basée sur des connaissances générales et des recherches limitées. Il est recommandé de faire des recherches plus approfondies pour chaque université spécifique.

Universités Publiques

Université Abdou Moumouni de Niamey (UAM)

Points Forts Potentiels:
La plus ancienne et la plus grande université du Niger, avec une longue histoire.
Située dans la capitale, Niamey, offrant potentiellement plus d'opportunités et de ressources.
Offre une large gamme de disciplines et de facultés.
Peut avoir des liens établis avec le gouvernement et d'autres institutions nationales.
Points Faibles Potentiels:
Peut souffrir de problèmes de surpopulation en raison du grand nombre d'étudiants.
Les ressources et les infrastructures peuvent être limitées.
La qualité de l'enseignement peut varier selon les facultés et les départements.
Potentiellement sujette aux grèves et aux perturbations académiques.
Université de Zinder

Points Forts Potentiels:
Située dans une autre grande ville du Niger, Zinder, servant une population étudiante régionale.
Peut avoir des programmes plus spécialisés axés sur les besoins locaux.
Potentiellement une atmosphère plus communautaire en raison de sa taille plus petite.
Points Faibles Potentiels:
Peut avoir des ressources et des financements plus limités que l'UAM.
L'étendue des programmes offerts peut être moins importante.
Moins d'opportunités potentielles en dehors du campus comparé à Niamey.
Université de Maradi (UDM) / Université Dan Dicko Dankoulodo de Maradi (UDDM)

Points Forts Potentiels:
Située dans une région économiquement importante (Maradi).
Peut se concentrer sur des domaines pertinents pour le développement régional (agriculture, commerce, etc.).
En tant qu'université plus récente (fondée en 2010), elle pourrait être plus adaptable aux besoins modernes.
Points Faibles Potentiels:
Moins d'histoire et de tradition académique que les universités plus anciennes.
Le développement des infrastructures et des programmes peut être en cours.
La reconnaissance nationale et internationale peut être en développement.
Université de Tahoua

Points Forts Potentiels:
Dessert une région spécifique du Niger, contribuant au développement local.
Peut avoir des spécialisations uniques liées aux ressources ou aux industries régionales.
Points Faibles Potentiels:
Potentiellement la plus limitée en termes de ressources et de programmes offerts parmi les universités publiques.
Peut être confrontée à des défis en termes d'attraction et de rétention du personnel qualifié.
Universités Privées (Liste non exhaustive)

Il existe un certain nombre d'universités privées au Niger, dont les informations sur leurs points forts et faibles peuvent être plus difficiles à généraliser sans une recherche spécifique pour chacune.
Points Forts Potentiels (généraux pour les universités privées):
Peuvent offrir des programmes plus spécialisés ou axés sur le marché du travail.
Les classes peuvent être plus petites, permettant une attention plus personnalisée.
Les infrastructures et les ressources peuvent être de meilleure qualité dans certains cas (en fonction des frais de scolarité et des investissements).
Peuvent avoir des liens plus étroits avec des industries ou des organisations spécifiques.
Points Faibles Potentiels (généraux pour les universités privées):
Les frais de scolarité peuvent être plus élevés, limitant l'accès.
La reconnaissance de leurs diplômes peut varier.
La qualité de l'enseignement et des programmes peut être inégale.
La durabilité financière peut être une préoccupation pour certaines institutions plus petites.
Pour obtenir des informations plus précises et à jour, il est conseillé de:

Consulter les sites web officiels de chaque université.
Rechercher des évaluations ou des rapports récents sur le système d'enseignement supérieur au Niger.
Contacter directement les universités pour obtenir des informations sur leurs programmes, leurs installations et leurs conditions d'admission.
Parler à des étudiants actuels ou anciens pour obtenir leurs perspectives.
`; // Load this from a file or a DB if needed

    const formattedMessages = [
      {
        role: "user",
        parts: [{ text: `DOCUMENT CONTEXT:\n${documentText}` }],
      },
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((msg: ChatMessage) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    ];

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedMessages,
    });

    const text = result.text;
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
