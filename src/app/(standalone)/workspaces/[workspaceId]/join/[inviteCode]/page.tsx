import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/get-session";
import { createUrqlServer } from "@/lib/urql-server";
import { GET_WORKSPACE_INFO } from "@/features/workspaces/graphql/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";

interface WorkspaceIdJoinPageProps {
  params: Promise<{ workspaceId: string }>;
}

interface QueryResponse {
  getWorkspaceInfo: {
    name: string;
  };
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const { workspaceId } = await params;
  const auth = await getSession();
  if (!auth?.session) redirect("/sign-in");

  const { getClient } = createUrqlServer(auth?.cookieHeader);

  const workspace = await getClient().query<QueryResponse>(GET_WORKSPACE_INFO, {
    id: workspaceId
  });

  if (
    workspace.data?.getWorkspaceInfo === null ||
    workspace.data?.getWorkspaceInfo === undefined
  ) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace.data?.getWorkspaceInfo} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
