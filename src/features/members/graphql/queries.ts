import { gql } from "urql";

export const GET_MEMBERS_FORM = gql`
  query GetMembers($workspaceId: String!) {
    GetMembers(workspaceId: $workspaceId) {
      id
      name
    }
  }
`;
