import { Loader } from "lucide-react";
import { useQuery } from "@urql/next";

import { CreateTaskForm } from "./create-task-form";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { GET_MEMBERS_FORM } from "@/features/members/graphql/queries";
import { GET_PROJECTS_QUERY } from "@/features/projects/graphql/queries";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
}

interface QueryResponseMembers {
  getMembers: {
    id: string;
    name: string;
  }[];
}

interface QueryResponseProjects {
  getProjects: {
    id: string;
    name: string;
    image: string;
  }[];
}

export const CreateTaskFormWrapper = ({
  onCancel
}: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const [{ data, fetching }] = useQuery<QueryResponseMembers>({
    query: GET_MEMBERS_FORM,
    variables: { workspaceId }
  });

  const [{ data: projectsData, fetching: fetchingProjects }] =
    useQuery<QueryResponseProjects>({
      query: GET_PROJECTS_QUERY,
      variables: { workspaceId }
    });

  const isLoadingProjects = fetchingProjects;
  const projectOptions = projectsData?.getProjects;

  const isLoadingMembers = fetching;
  const memberOptions = data?.getMembers;

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
