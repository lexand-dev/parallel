import { redirect } from "next/navigation";

import { createUrqlServer } from "@/lib/urql-server";
import { getSession } from "@/features/auth/get-session";
import { Workspace } from "@/features/workspaces/schemas";
import { GET_WORKSPACES_QUERY } from "@/features/workspaces/graphql/queries";

interface QueryResponse {
  getWorkspaces: Workspace[];
}

export default async function Home() {
  const auth = await getSession();

  const { getClient } = createUrqlServer(auth?.cookieHeader);

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
