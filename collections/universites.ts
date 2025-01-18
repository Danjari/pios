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
    defaultColumns: ['nomDeLUniversite', 'slug', 'location'],
  },
  fields: [
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
      admin: {
        position: 'sidebar',
      },
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
      name: 'lienVideo',
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
  ],
};
