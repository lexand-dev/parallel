import { gql } from "urql";

export const GET_MEMBERS_FORM = gql`
  query GetMembers($workspaceId: ID!) {
    getMembers(workspaceId: $workspaceId) {
      id
      name
    }
  }
`;
