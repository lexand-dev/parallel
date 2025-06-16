"use client";

import Link from "next/link";
import { useQuery } from "@urql/next";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";

import { TaskFull } from "@/features/tasks/schemas";
import { Member } from "@/features/members/types";
import { AnalyticsResponse, Project } from "@/features/projects/schemas";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";

import { Button } from "@/components/ui/button";
import { PageError } from "@/components/page-error";
import { Analytics } from "@/components/analytics";
import { PageLoader } from "@/components/page-loader";
import { Card, CardContent } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";

import { GET_MEMBERS } from "@/features/members/graphql/queries";
import { GET_TASKS_QUERY } from "@/features/tasks/graphql/queries";
import { GET_PROJECTS_QUERY } from "@/features/projects/graphql/queries";
import { GET_ANALYTICS_WORKSPACE_QUERY } from "@/features/workspaces/graphql/queries";
import { cn } from "@/lib/utils";

interface QueryAnalyticsResponse {
  getAnalyticsWorkspace: AnalyticsResponse;
}

interface QueryTasksResponse {
  getTasks: TaskFull[];
}

interface QueryProjectsResponse {
  getProjects: Project[];
}

interface QueryMembersResponse {
  getMembers: Member[];
}

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const [{ data: analyticsData, fetching: isLoadingAnalytics }] =
    useQuery<QueryAnalyticsResponse>({
      query: GET_ANALYTICS_WORKSPACE_QUERY,
      variables: { workspaceId }
    });

  const [{ data: tasksData, fetching: isLoadingTasks }] =
    useQuery<QueryTasksResponse>({
      query: GET_TASKS_QUERY,
      variables: { workspaceId }
    });

  const [{ data: projectsData, fetching: isLoadingProjects }] =
    useQuery<QueryProjectsResponse>({
      query: GET_PROJECTS_QUERY,
      variables: { workspaceId }
    });

  const [{ data: membersData, fetching: isLoadingMembers }] =
    useQuery<QueryMembersResponse>({
      query: GET_MEMBERS,
      variables: { workspaceId }
    });

  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  const analytics = analyticsData?.getAnalyticsWorkspace;
  const tasks = tasksData?.getTasks;
  const projects = projectsData?.getProjects;
  const members = membersData?.getMembers;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Failed to load workspace data" />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks} total={tasks.length} />
        <ProjectList data={projects} total={projects.length} />
        <MembersList data={members} total={members.length} />
      </div>
    </div>
  );
};

interface TaskListProps {
  data: TaskFull[];
  total: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createTask } = useCreateTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant="muted" size="icon" onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.map((task) => {
            const dueDate = new Date(task.dueDate);
            const isOverdue = dueDate < new Date();
            return (
              <li key={task.id}>
                <Link href={`/workspaces/${workspaceId}/tasks/${task.id}`}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p>{task.project?.name}</p>
                        <div className="size-1 rounded-full bg-neutral-300" />
                        <div className="text-sm text-muted-foreground flex items-center">
                          <CalendarIcon
                            className={cn(
                              "size-3 mr-1",
                              isOverdue ? "text-red-500" : "text-neutral-500"
                            )}
                          />
                          <span
                            className={cn(
                              "truncate",
                              isOverdue ? "text-red-500" : "text-neutral-500"
                            )}
                          >
                            {formatDistanceToNow(dueDate)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tasks found
          </li>
        </ul>
        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
};

interface ProjectListProps {
  data: Project[];
  total: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createProject } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({total})</p>
          <Button variant="secondary" size="icon" onClick={createProject}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => (
            <li key={project.id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      className="size-12"
                      fallbackClassName="text-lg"
                      name={project.name}
                      image={project.image}
                    />
                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No projects found
          </li>
        </ul>
      </div>
    </div>
  );
};

interface MembersListProps {
  data: Member[];
  total: number;
}

export const MembersList = ({ data, total }: MembersListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button asChild variant="secondary" size="icon">
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => (
            <li key={member.id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <MemberAvatar className="size-12" name={member.name} />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
};
