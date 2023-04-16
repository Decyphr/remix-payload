import seo from '@payloadcms/plugin-seo';
import path from 'path';
import { Payload } from 'payload';
import { buildConfig } from 'payload/config';
import Media from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';
import { seedPages, seedUsers } from './seed/index';

const siteTitle = 'Website.com';

const config = buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'payload-schema.graphql'),
  },
  plugins: [seo({})],
  onInit: async (payload: Payload) => {
    if (process.env.NODE_ENV === 'development') {
      await seedUsers(payload);
      await seedPages(payload);
    }
  },
});

export default config;
