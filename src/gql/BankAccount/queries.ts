import { gql } from "@apollo/client";

const GET_BANK_ACCOUNT = gql`
  query FindOneBankAccount(
    $getBankAccountGetterInput: GetBankAccountGetterInput!
  ) {
    findOneBankAccount(getBankAccountGetterInput: $getBankAccountGetterInput) {
      balance
      typeAccount
    }
  }
`;

export default { GET_BANK_ACCOUNT };
