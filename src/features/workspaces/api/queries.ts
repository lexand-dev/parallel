import { gql } from "urql";

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($name: String!, $image: Upload) {
    createWorkspace(name: $name, image: $image) {
      id
      name
      userId
      image
      __typename
    }
  }
`;

export const GET_WORKSPACES_QUERY = gql`
  query GetWorkspaces {
    workspaces {
      id
      name
      userId
      __typename
    }
  }
`;
