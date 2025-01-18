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
      admin: {
        position: 'sidebar',
      },
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
    // This generates an HTML version of the content
    lexicalHTML('longDescription', { name: 'longDescription_html' }),
    {
      name: 'region',
      type: 'select',
      options: ['Niamey', 'Zinder', 'Maradi', 'Tahaoua', 'Agadez'], // Example regions
    },
    {
      name: 'categorie',
      type: 'text',
    },
  ],
};
