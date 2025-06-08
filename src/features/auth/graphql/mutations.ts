import { gql } from "urql";

export const SING_UP_MUTATION = gql`
  mutation Signup($input: AuthInput!) {
    signup(input: $input) {
      message
      success
    }
  }
`;

export const SING_IN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
      success
    }
  }
`;

export const CURRENT_USER = gql`
  query Query {
    current {
      name
      email
    }
  }
`;
