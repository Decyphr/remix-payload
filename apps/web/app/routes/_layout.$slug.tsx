import type { Page } from '@org/cms';
import { LoaderFunction, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { RenderBlocks } from '~/components/Blocks';

type LoaderData = {
  page: Page;
};

export const loader: LoaderFunction = async ({
  context: { payload, user },
  params,
}) => {
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: params.slug } },
  });

  if (!pages[0]) throw json({ message: 'Not Found' }, { status: 404 });

  return json<LoaderData>({ page: pages[0] });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { page } = data;

  return [
    { title: page?.meta.title },
    {
      name: 'description',
      content: page?.meta.description,
    },
    {
      name: 'keywords',
      content: page?.meta.keywords,
    },
  ];
};

export default function PageSlug() {
  const { page } = useLoaderData();

  return (
    <div>
      {page?.layout ? (
        <RenderBlocks layout={page.layout} />
      ) : (
        'This page seem to be empty'
      )}
    </div>
  );
}
