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

// export const Universites: CollectionConfig = {
//   slug: 'universites',
//   admin: {
//     useAsTitle: 'nomDeLUniversite',
//     defaultColumns: ['nomDeLUniversite', 'slug', 'location'],
//   },
//   fields: [
//     {
//       name: 'nomDeLUniversite',
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
//             if (!siblingData.slug && siblingData.nomDeLUniversite) {
//               siblingData.slug = siblingData.nomDeLUniversite
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
//       name: 'description',
//       type: 'textarea',
//       required: true,
//     },
//     {
//       name: 'region',
//       type: 'select',
//       options: ['Niamey', 'Zinder', 'Maradi', 'Tahaoua', 'Agadez',"Tillabery","Dosso","Diffa"], // Example regions
//     },
//     {
//       name: 'logo',
//       type: 'upload',
//       label: 'Logo',
//       relationTo: 'media', // Assuming you have a 'media' collection for uploads
//       required: true,
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

export const Universites: CollectionConfig = {
  slug: 'universites',
  admin: {
    useAsTitle: 'nomDeLUniversite',
    defaultColumns: ['nomDeLUniversite', 'slug', 'region'],
  },
  fields: [
    // Basic Info
    {
      name: 'nomDeLUniversite',
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
            if (!siblingData.slug && siblingData.nomDeLUniversite) {
              siblingData.slug = siblingData.nomDeLUniversite
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      options: ['Niamey', 'Zinder', 'Maradi', 'Tahaoua', 'Agadez', 'Tillabery', 'Dosso', 'Diffa'],
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'educationSystem',
      type: 'text',
    },
    {
      name: 'graduatesCount',
      type: 'number',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bannerImage',
      type: 'upload',
      label: 'Bannière',
      relationTo: 'media',
    },
    {
      name: 'motto',
      type: 'text',
    },
    {
      name: 'cycleDuration',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },

    // Faculties OR Flat Filières
    {
      name: 'hasFaculties',
      type: 'checkbox',
      label: 'Cette université a-t-elle des facultés ?',
      defaultValue: false,
    },
    {
      name: 'faculties',
      type: 'array',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasFaculties),
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'filieres',
          type: 'relationship',
          relationTo: 'filieres',
          hasMany: true,
        },
      ],
    },
    {
      name: 'filieres',
      type: 'relationship',
      relationTo: 'filieres',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => !Boolean(siblingData?.hasFaculties),
      },
    },

    // Academic Info
    {
      name: 'academicResults',
      type: 'textarea',
    },
    {
      name: 'admissionRequirements',
      type: 'array',
      fields: [{ name: 'requirement', type: 'text' }],
    },

    // Tuition Fees
    {
      name: 'tuitionFees',
      type: 'array',
      fields: [
        { name: 'program', type: 'text' },
        {
          name: 'amount',
          type: 'text',
          validate: (val: string | null | undefined) => {
            if (val === null || val === undefined || val === '') return true;
            return /^[0-9]+$/.test(val) ? true : 'Le montant doit être numérique';
          },
        },
      ],
    },

    // Accreditation and Authorization
    {
      name: 'accreditations',
      type: 'textarea',
    },
    {
      name: 'authorization',
      type: 'textarea',
    },

    // Campus Resources, Partners, Clubs
    {
      name: 'campusResources',
      type: 'array',
      fields: [{ name: 'resource', type: 'text' }],
    },
    {
      name: 'partners',
      type: 'array',
      fields: [{ name: 'partner', type: 'text' }],
    },
    {
      name: 'studentActivities',
      type: 'array',
      fields: [{ name: 'activity', type: 'text' }],
    },
    {
      name: 'clubs',
      type: 'array',
      fields: [{ name: 'club', type: 'text' }],
    },

    // Gallery
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'src', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
    },

    // Videos
    {
      name: 'videos',
      type: 'array',
      fields: [
        { name: 'src', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },

    // Long Description
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
  ],
};
