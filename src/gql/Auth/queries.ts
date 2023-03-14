import { gql } from "@apollo/client";

export interface IValidateTokenResponse {
  token: string;
}

export const VALIDATE_TOKEN = gql`
  query Revalidate {
    revalidate {
      token
    }
  }
`;

export default { VALIDATE_TOKEN };
