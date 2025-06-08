import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/get-session";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { createUrqlServer } from "@/lib/urql-server";
import { GET_WORKSPACE_QUERY } from "@/features/workspaces/graphql/queries";
import { Workspace } from "@/features/workspaces/schemas";

interface WorkspaceIdSettingPageProps {
  params: Promise<{ workspaceId: string }>;
}

interface QueryResponse {
  getWorkspace: Workspace;
}

const WorkspaceIdSettingPage = async ({
  params
}: WorkspaceIdSettingPageProps) => {
  const { workspaceId } = await params;
  const auth = await getSession();
  if (!auth?.session) redirect("/sign-in");

  const { getClient } = createUrqlServer(auth?.cookieHeader);

  const workspace = await getClient().query<QueryResponse>(
    GET_WORKSPACE_QUERY,
    { id: workspaceId }
  );

  const initialValues = workspace.data?.getWorkspace;

  if (!initialValues) {
    redirect(`/workspaces/${workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingPage;
