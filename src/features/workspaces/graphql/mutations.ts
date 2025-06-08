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
