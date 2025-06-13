import { gql } from "urql";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $name: String!
    $status: TaskStatus!
    $workspaceId: ID!
    $projectId: ID!
    $dueDate: String
    $assigneeId: ID
  ) {
    createTask(
      name: $name
      status: $status
      workspaceId: $workspaceId
      projectId: $projectId
      dueDate: $dueDate
      assigneeId: $assigneeId
    ) {
      id
      name
      status
    }
  }
`;
