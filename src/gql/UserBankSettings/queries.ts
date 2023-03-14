import { gql } from "@apollo/client";
export const GET_USER_BANK_SETTINGS = gql`
  query UserBankSetting {
    userBankSetting {
      bankSetting {
        id
        bankName
      }
      user {
        id
        name
        email
      }
      bankAccount {
        ... on CheckingAccount {
          id
          updatedAt
          createdAt
          balance
          accountNumber
          typeAccount
          transferenceCost
        }
        ... on SavingsAccount {
          id
          updatedAt
          createdAt
          balance
          accountNumber
          typeAccount
          interestRate
        }
      }
    }
  }
`;

export default { GET_USER_BANK_SETTINGS };
