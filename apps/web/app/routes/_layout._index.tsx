import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const loader = async ({}: LoaderArgs) => {
  return json({});
};

export const action = async ({}: ActionArgs) => {
  return redirect('');
};

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="test-page">Test Page</Link>
    </div>
  );
}
