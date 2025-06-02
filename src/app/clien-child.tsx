"use client";

import { gql, useSuspenseQuery } from "@apollo/client";

const QUERY = gql`
  query Query {
    hello
  }
`;

export function ClientChild() {
  const { data } = useSuspenseQuery(QUERY);
  console.log("ClientChild data:", data);
  return (
    <div>
      <h2 className="text-3xl text-amber-400!">Client Child</h2>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
