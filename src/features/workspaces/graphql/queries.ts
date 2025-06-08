import { gql } from "urql";

export const GET_WORKSPACES_QUERY = gql`
  query getWorkspaces {
    getWorkspaces {
      id
      name
      image
      __typename
    }
  }
`;

export const GET_WORKSPACE_QUERY = gql`
  query getWorkspace($id: ID!) {
    getWorkspace(id: $id) {
      id
      name
      image
      inviteCode
      __typename
    }
  }
`;
