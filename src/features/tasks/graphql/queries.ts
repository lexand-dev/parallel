import { gql } from "urql";

export const GET_TASKS_QUERY = gql`
  query GetTasks(
    $workspaceId: ID!
    $projectId: ID
    $assigneeId: ID
    $status: TaskStatus
    $search: String
    $dueDate: String
  ) {
    getTasks(
      workspaceId: $workspaceId
      projectId: $projectId
      assigneeId: $assigneeId
      status: $status
      search: $search
      dueDate: $dueDate
    ) {
      id
      name
      status
      dueDate
      workspaceId
      projectId
      assigneeId
      position
      description
    }
  }
`;
