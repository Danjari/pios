import { revalidatePage } from '@/lib/revalidatePage';
import type { CollectionConfig } from 'payload';

export const Bourses: CollectionConfig = {
  slug: 'bourses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'country', 'coverage'],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const path = `/bourses/${doc.slug}`; // Adjust your dynamic segment
        await revalidatePage({ path });
        await revalidatePage({ path: `/bourses` });
      },
    ],
  },
  fields: [
    // Basic Info
    {
      name: 'name',
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
            if (!siblingData.slug && siblingData.name) {
              siblingData.slug = siblingData.name
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
      name: 'type',
      type: 'select',
      options: ['Gouvernementale', 'Internationale', 'Privée', 'Universitaire'],
      required: true,
    },
    {
      name: 'country',
      type: 'select',
      options: ['Niger', 'Afrique', 'Amerique', 'Europe', 'Asie', 'Oceanie',"Globale"],
      required: true,
    },
    {
      name: 'coverage',
      type: 'select',
      options: ['100%', '75%', '50%', '25%'],
      required: true,
    },
    {
      name: 'duration',
      type: 'select',
      options: ['1 an', '2 ans', '3 ans', 'Cycle complet'],
      required: true,
    },
    {
      name: 'levels',
      type: 'select',
      hasMany: true,
      options: ['Licence', 'Master', 'Doctorat'],
      required: true,
    },

    // Descriptions
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      required: true,
    },

    // Eligibility
    {
      name: 'eligibilityRequirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },

    // Application Process
    {
      name: 'applicationProcess',
      type: 'array',
      fields: [
        {
          name: 'step',
          type: 'text',
        },
      ],
    },

    // Required Documents
    {
      name: 'requiredDocuments',
      type: 'array',
      fields: [
        {
          name: 'document',
          type: 'text',
        },
      ],
    },

    // Deadline
    {
      name: 'applicationDeadline',
      type: 'text',
    },

    // Contact Info
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'email', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'website', type: 'text' },
        { name: 'address', type: 'textarea' },
      ],
    },

    // Optional
    {
      name: 'partnerUniversities',
      type: 'array',
      fields: [
        {
          name: 'university',
          type: 'text',
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'availableSpots',
      type: 'number',
    },
    {
      name: 'additionalNotes',
      type: 'textarea',
    },
    {
      name: 'applicationLink',
      label: 'Lien vers l\'opportunité',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'https://example.com',
      },
      validate: (val: string | null | undefined) =>
        val && !/^https?:\/\/[\w.-]+\.[a-z]{2,}.*$/.test(val)
          ? 'Veuillez entrer un lien valide commençant par http:// ou https://'
          : true,
    },
  ],
};
