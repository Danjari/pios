// import type { CollectionConfig } from 'payload';
// import {
//   BlocksFeature,
//   FixedToolbarFeature,
//   HeadingFeature,
//   HorizontalRuleFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
//   HTMLConverterFeature,
//   lexicalHTML,
// } from '@payloadcms/richtext-lexical';

// export const Filieres: CollectionConfig = {
//   slug: 'filieres',
//   admin: {
//     useAsTitle: 'nomDeFiliere',
//     defaultColumns: ['nomDeFiliere', 'slug', 'region'],
//   },
//   fields: [
//     {
//       name: 'nomDeFiliere',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       admin: {
//         position: 'sidebar',
//       },
//       hooks: {
//         beforeValidate: [
//           ({ siblingData }) => {
//             if (!siblingData.slug && siblingData.nomDeFiliere) {
//               siblingData.slug = siblingData.nomDeFiliere
//                 .toLowerCase()
//                 .replace(/ /g, '-')
//                 .replace(/[^\w-]+/g, '');
//             }
//             return siblingData.slug;
//           },
//         ],
//       },
//     },
//     {
//       name: 'descriptionCourte',
//       type: 'textarea',
//       required: true,
//     },
//     {
//       name: 'salaireMoyen',
//       type: 'text',
//     },
//     {
//       name: 'longDescription',
//       type: 'richText',
//       editor: lexicalEditor({
//         features: ({ defaultFeatures }) => [
//           ...defaultFeatures,
//           HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
//           BlocksFeature({ blocks: [] }),
//           FixedToolbarFeature(),
//           InlineToolbarFeature(),
//           HorizontalRuleFeature(),
//           HTMLConverterFeature({}),
//         ],
//       }),
//     },
//     // This generates an HTML version of the content
//     lexicalHTML('longDescription', { name: 'longDescription_html' }),
    
//     {
//       name: 'Categorie',
//       type: 'select',
//       options: ['Engenieurie', 'Administration', 'Technologie', 'Agriculture', 'Science Sociale', "Science de la Terre"], // Example regions
//     },
//   ],
// };


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

export const Filieres: CollectionConfig = {
  slug: 'filieres',
  admin: {
    useAsTitle: 'nomDeFiliere',
    defaultColumns: ['nomDeFiliere', 'slug', 'region'],
  },
  fields: [
    {
      name: 'nomDeFiliere',
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
      type: 'select',
      options: [
        'Technologie',
        'Économie',
        'Agriculture',
        'Santé',
        'Sciences Sociales',
      ],
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'bacRequired',
      type: 'select',
      hasMany: true,
      options: ['A', 'C', 'D', 'F1', 'F2', 'F3', 'G1', 'G2'],
      required: true,
    },
    {
      name: 'locations',
      type: 'select',
      hasMany: true,
      options: ['Niamey', 'Maradi', 'Zinder', 'Tahoua', 'Agadez', 'Dosso', 'Diffa', 'Tillabéri'],
    },
    {
      name: 'prerequisites',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'careerOpportunities',
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
  ],
};
