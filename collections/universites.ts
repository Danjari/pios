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


export const Universites: CollectionConfig = {
  slug: 'universites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'city'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [({ siblingData }) => {
          if (!siblingData.slug && siblingData.name) {
            siblingData.slug = siblingData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
          }
          return siblingData.slug
        }]
      }
    },
    { name: 'type', type: 'text' },
    {
      name: 'region',
      type: 'select',
      options: ['Niamey', 'Zinder', 'Maradi', 'Tahaoua', 'Agadez','Tillabery','Dosso','Diffa'],
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'Niger',
      admin: {
        placeholder: 'Niger',
        description: 'Entrer un autre pays si différent de Niger',
      },
    },
    { name: 'educationSystem', type: 'text' },
    { name: 'graduatesCount', type: 'number' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'motto', type: 'text' },
    {
      name: 'cycleDuration',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },
    {
      name: 'programs',
      type: 'relationship',
      relationTo: 'filieres',
      hasMany: true,
      required: false,
      admin: {
        isSortable: true,
      },
    },
    {
      name: 'academicResults',
      type: 'textarea',
    },
    {
      name: 'admissionRequirements',
      type: 'array',
      fields: [{ name: 'requirement', type: 'text' }],
    },
    {
      name: 'tuitionFees',
      type: 'array',
      fields: [
        { name: 'program', type: 'text' },
        { name: 'amount', type: 'text' },
      ],
    },
    { name: 'accreditations', type: 'textarea' },
    { name: 'authorization', type: 'textarea' },
    {
      name: 'campusResources',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
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
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'src', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'videos',
      type: 'array',
      fields: [
        { name: 'src', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },
  ],
};
