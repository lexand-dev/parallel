import { redirect } from "next/navigation";
import { registerUrql } from "@urql/next/rsc";
import { getSession } from "@/features/auth/get-session";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

import { Workspace } from "@/features/workspaces/schemas";
import { GET_WORKSPACES_QUERY } from "@/features/workspaces/graphql/queries";
import { cookies } from "next/headers";

interface QueryResponse {
  getWorkspaces: Workspace[];
}

export default async function Home() {
  const auth = await getSession();

  const makeClient = () => {
    return createClient({
      url: "http://localhost:4000/graphql",
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: {
        credentials: "include",
        headers: {
          cookie: auth?.cookieHeader!
        }
      }
    });
  };

  const { getClient } = registerUrql(makeClient);

  if (!auth?.session) {
    redirect("/sign-in");
  }

  const workspaces = await getClient().query<QueryResponse>(
    GET_WORKSPACES_QUERY,
    {}
  );

  if (
    !workspaces?.data?.getWorkspaces ||
    workspaces.data.getWorkspaces.length === 0
  ) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.data.getWorkspaces[0].id}`);
  }
}
