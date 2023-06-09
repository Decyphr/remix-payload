import path from 'path';
import type { Payload } from 'payload';
import { mediaSlug } from '../collections/Media';
import { pagesSlug } from '../collections/Pages';
import { usersSlug } from '../collections/Users';
import home from './home-page.json';
import posts from './posts-page';

export const seedPages = async (payload: Payload) => {
  const { totalDocs } = await payload.find({
    collection: pagesSlug,
  });
  if (!totalDocs) {
    const createdMedia = await payload.create({
      collection: mediaSlug,
      data: {
        alt: 'Payload',
        // Payloads incorrectly expects a 'sizes' object here, which should be optional since they are created during upload
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      filePath: path.resolve(__dirname, './payload.jpg'),
    });

    const createdPostsPage = await payload.create({
      collection: pagesSlug,
      data: posts,
    });

    const publicString = JSON.stringify(home)
      .replace(/{{IMAGE_ID}}/g, createdMedia.id)
      .replace(/{{SAMPLE_PAGE_ID}}/g, createdPostsPage.id);

    await payload.create({
      collection: pagesSlug,
      data: JSON.parse(publicString),
    });
    payload.logger.info(`Successfully seeded pages into database`);
  }
};

export const seedUsers = async (payload: Payload) => {
  const { totalDocs } = await payload.find({
    collection: usersSlug,
  });
  /* if (!totalDocs) {
    // initial Admin User
    payload.create({
      collection: usersSlug,
      data: {
        email: 'blakeha94@gmail.com',
        password: 'dev#LIFE18',
        name: 'Admin User',
        role: 'admin',
      },
    });
    // initial Frontend User
    payload.create({
      collection: usersSlug,
      data: {
        email: 'user@payloadcms.com',
        password: 'qwerty',
        name: 'Frontend User',
        role: 'user',
      },
    });
    payload.logger.info(`Successfully seeded users into database`);
  } */
};
