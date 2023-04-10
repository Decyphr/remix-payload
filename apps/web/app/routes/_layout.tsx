import { Outlet, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';

export default function Index() {
  const matches = useMatches();

  const [{ data }] = matches;
  const { user } = (data as RootLoaderData) || {};

  return (
    <div>
      {/* Header */}
      <Outlet />
      {/* Footer */}
    </div>
  );
}
