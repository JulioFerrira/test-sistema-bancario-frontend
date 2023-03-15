import { gql } from "@apollo/client";
import { EAccountType } from "../../types/BankAccount/index";

export interface IAddContactInput {
  accountNumber: string;
  accountType: EAccountType;
  bankName: string;
  email: string;
  transferencePassword: string;
}

export interface IAddUserBankSettingsInput {
  createUserBankSettingDto: {
    bankSettingInput: {
      transferencePassword: string;
    };
    createBankAccountsFactoryInput: {
      accountType: string;
      balance: number;
      bankName: string;
    };
    userInput: {
      email: string;
      name: string;
      password: string;
    };
  };
}

const ADD_CONTACT = gql`
  mutation AddContact($addContactInput: AddContactInput!) {
    addContact(addContactInput: $addContactInput)
  }
`;

const ADD_USER_BANK_SETTINGS = gql`
  mutation CreateUserBankSettings(
    $createUserBankSettingDto: CreateUserBankSettingInputType!
  ) {
    createUserBankSettings(
      createUserBankSettingDto: $createUserBankSettingDto
    ) {
      id
    }
  }
`;

export default { ADD_CONTACT, ADD_USER_BANK_SETTINGS };
