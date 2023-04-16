import { CollectionConfig } from 'payload/types';
import { authenticatedAndAdmin, pageIsPublic } from '../access/index';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { Image } from '../blocks/Image';
import formatSlug from '../utilities/formatSlug';
import { mediaSlug } from './Media';

// SEO fields
import { getMetaDescriptionField } from '@payloadcms/plugin-seo/dist/fields/MetaDescription';
import { getMetaImageField } from '@payloadcms/plugin-seo/dist/fields/MetaImage';
import { getMetaTitleField } from '@payloadcms/plugin-seo/dist/fields/MetaTitle';
import { Overview } from '@payloadcms/plugin-seo/dist/ui/Overview';
import { getPreviewField } from '@payloadcms/plugin-seo/dist/ui/Preview';

const seoConfig = {
  uploadsCollection: 'media',
  generateTitle: ({ doc }: any) => `${doc?.title?.value} — Site name`,
  generateDescription: ({ doc }: any) => doc?.excerpt?.value,
  generateURL: ({ doc }: any) => `https://domain.com/${doc?.slug?.value}`,
  generateImage: ({ doc }: any) => doc?.featuredImage?.value,
};

export const pagesSlug = 'pages';
export const Pages: CollectionConfig = {
  slug: pagesSlug,
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (doc?.slug) {
        return `http://localhost:3000/preview/${doc.slug}`;
      }

      return '';
    },
  },
  access: {
    read: ({ req }) => {
      if (authenticatedAndAdmin({ req })) return true;
      return pageIsPublic();
    },
    create: authenticatedAndAdmin,
    update: authenticatedAndAdmin,
    delete: authenticatedAndAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              label: 'Page Title',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              label: 'Excerpt',
              type: 'textarea',
              required: false,
            },
            {
              name: 'image',
              label: 'Featured Image',
              type: 'upload',
              relationTo: mediaSlug,
            },
            {
              name: 'layout',
              label: 'Page Layout',
              type: 'blocks',
              minRows: 1,
              blocks: [CallToAction, Content, Image],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              label: 'SEO',
              type: 'group',
              fields: [
                {
                  name: 'overview',
                  label: 'Overview',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: Overview,
                    },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  admin: {
                    components: {
                      Field: (props) =>
                        getMetaTitleField({
                          ...props,
                          ...{ pluginConfig: seoConfig },
                        }),
                    },
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    components: {
                      Field: (props) =>
                        getMetaDescriptionField({
                          ...props,
                          ...{ pluginConfig: seoConfig },
                        }),
                    },
                  },
                },
                {
                  name: 'image',
                  label: 'Meta Image',
                  type: 'upload',
                  localized: true,
                  relationTo: seoConfig?.uploadsCollection,
                  admin: {
                    description:
                      'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
                    components: {
                      Field: (props) =>
                        getMetaImageField({
                          ...props,
                          ...{ pluginConfig: seoConfig },
                        }),
                    },
                  },
                },
                {
                  name: 'preview',
                  label: 'Preview',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: (props) =>
                        getPreviewField({
                          ...props,
                          ...{ pluginConfig: seoConfig },
                        }),
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'slug',
      label: 'Page Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
};

export default Pages;
