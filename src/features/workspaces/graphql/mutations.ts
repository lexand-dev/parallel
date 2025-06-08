import { gql } from "urql";

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($name: String!, $image: ImageInput) {
    createWorkspace(name: $name, image: $image) {
      id
      name
      image
      userId
    }
  }
`;

export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation UpdateWorkspace($id: ID!, $name: String!, $image: ImageInput) {
    updateWorkspace(id: $id, name: $name, image: $image) {
      id
      name
      image
      userId
    }
  }
`;
