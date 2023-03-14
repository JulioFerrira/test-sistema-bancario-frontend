import { gql } from "@apollo/client";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;

export default { LOGIN };
