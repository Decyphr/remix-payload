import type { User } from '@org/cms';
import type {
  LinksFunction,
  LoaderFunction,
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

import styles from './styles/global.css';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export type RootLoaderData = {
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
  return { user };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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

  // use throw json({}) to render catch boundary
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Links />
        </head>
        <body>
          <div className="bg-black text-white h-screen w-full flex justify-center items-center">
            <p className="text-5xl font-thin">
              {error.status} | {error.data.message}
            </p>
          </div>
        </body>
      </html>
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
