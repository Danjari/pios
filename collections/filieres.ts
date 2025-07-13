
import type { CollectionConfig } from 'payload';
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML,
} from '@payloadcms/richtext-lexical';
import { revalidatePage } from '@/lib/revalidatePage';
import { buildFiliereSummary } from '@/lib/summaries/BuildFiliereSummary';
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_API_KEY!);

export const Filieres: CollectionConfig = {
  slug: 'filieres',
  admin: {
    useAsTitle: 'nomDeFiliere',
    defaultColumns: ['nomDeFiliere', 'slug'],
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Build summary
        const summaryText = buildFiliereSummary({
          nomDeFiliere: data.nomDeFiliere,
          category: data.category,
          duration: data.duration,
          bacRequired: data.bacRequired || [],
          locations: data.locations || [],
          descriptionCourte: data.descriptionCourte,
          longDescription_html: data.longDescription_html,
          prerequisites: data.prerequisites,
          careerOpportunities: data.careerOpportunities,
          universities: data.universities || [],
        });
    
        data.summaryText = summaryText;
    
        // Create embedding
        const embedding = await hf.featureExtraction({
          model: "intfloat/e5-large-v2",
          inputs: summaryText,
        });
    
        // Build link
        const link = `/filieres/${data.slug}`;
    
        // Save vector fields
        data.vectorizedTextSummary = embedding;
        data.vectorMetadata = {
          link,
          nomDeFiliere: data.nomDeFiliere,
        };
    
        return data;
      },
    ],
    
    afterChange: [
      async ({ doc }) => {
        const path = `/filieres/${doc.slug}`; // Adjust your dynamic segment
        await revalidatePage({ path });
        await revalidatePage({ path: `/filieres` });
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Detail page
        const path = `/filieres/${doc.slug}`;
        
        await revalidatePage({ path });

        // List page
        await revalidatePage({ path: `/filieres` });
      },
    ],
  },
  fields: [
    {
      name: 'nomDeFiliere',
      label:"Nom de la filiere",
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            if (!siblingData.slug && siblingData.nomDeFiliere) {
              siblingData.slug = siblingData.nomDeFiliere
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            }
            return siblingData.slug;
          },
        ],
      },
    },
    {
      name: 'descriptionCourte',
      label: "ecrit une description courte",
      type: 'textarea',
      required: true,
    },
    {
      name: 'salaireMoyen',
      type: 'text',
    },
    {
      name: 'longDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
          BlocksFeature({ blocks: [] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('longDescription', { name: 'longDescription_html' }),

    {
      name: 'category',
      label:"Domaine",
      type: 'select',
      options: [
        'Technologie',
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
        'Aviation civile et militaire',
      ],
      required: true,
    },
    {
      name: 'duration',
      label:"Durée du premier diplôme",
      type: 'text',
      required: true,
    },
    {
      name: 'bacRequired',
      type: 'select',
      hasMany: true,
      options: [
    'A',
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
    "PRO",
  ],
      required: true,
    },
    {
      name: 'locations',
      type: 'select',
      hasMany: true,
      options: ['Niamey', 'Maradi', 'Zinder', 'Tahoua', 'Agadez', 'Dosso', 'Diffa', 'Tillabéri',"Partout au Niger","Exterieur"],
    },
    {
      name: 'prerequisites',
      label: "Qualités requises",
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'careerOpportunities',
      label: "Domaine d'emploi",
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'universities',
      type: 'relationship',
      relationTo: 'universites',
      hasMany: true,
      required: false,
      admin: {
        // Optionally customize what shows in the admin UI
        // This uses `nomDeLUniversite`, since that's what your `useAsTitle` is set to
      },
    },
    {
      name: 'summaryText',
      label: 'Résumé complet (généré)',
      type: 'textarea',
      admin: {
        readOnly: true,
        description: 'Résumé généré automatiquement — utilisé pour AI et recherche avancée.',
      },
    },    
  ],
};
