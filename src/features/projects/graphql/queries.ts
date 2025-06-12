import { gql } from "urql";

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      image
      workspaceId
    }
  }
`;

export const GET_PROJECTS_QUERY = gql`
  query GetProjects($workspaceId: ID!) {
    getProjects(workspaceId: $workspaceId) {
      id
      name
      image
      workspaceId
    }
  }
`;
