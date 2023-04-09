import type { Page, User } from '@org/cms';
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  TypedResponse,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import uiStyles from '@org/ui/styles.css';
import styles from './styles/global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Payload CMS & Remix Monorepo',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: uiStyles,
  },
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export type RootLoaderData = {
  pages: Page[];
  user?: {
    user?: User;
    token?: string;
    exp?: number;
  };
};
export const loader: LoaderFunction = async ({
  context: { payload, user },
  request,
}): Promise<RootLoaderData | TypedResponse<never>> => {
  const { docs: pages } = await payload.find({
    collection: 'pages',
    user,
    overrideAccess: false,
  });

  return { pages, user };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  // TODO: Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = 'Unknown error';
  /* if (isDefinitelyAnError(error)) {
      errorMessage = error.message;
    } */

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
