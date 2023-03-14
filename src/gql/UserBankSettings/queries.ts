import { gql } from "@apollo/client";
export const GET_USER_BANK_SETTINGS = gql`
  query UserBankSetting {
    userBankSetting {
      bankSetting {
        id
        contacts {
          user {
            name
            email
          }
          bankAccount {
            id
            updatedAt
            createdAt
            balance
            accountNumber
            typeAccount
            ... on CheckingAccount {
              transferenceCost
            }
            ... on SavingsAccount {
              interestRate
            }
          }
        }
      }
      user {
        id
        name
        email
      }
      bankAccount {
        id
        updatedAt
        createdAt
        balance
        accountNumber
        bankName
        typeAccount
        ... on CheckingAccount {
          transferenceCost
        }
        ... on SavingsAccount {
          interestRate
        }
      }
    }
  }
`;

export default { GET_USER_BANK_SETTINGS };
