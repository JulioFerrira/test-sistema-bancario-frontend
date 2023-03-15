import { gql } from "@apollo/client";
import { EAccountType } from "../../types/BankAccount/index";

export interface IAddContactInput {
  accountNumber: string;
  accountType: EAccountType;
  bankName: string;
  email: string;
  transferencePassword: string;
}

const ADD_CONTACT = gql`
  mutation AddContact($addContactInput: AddContactInput!) {
    addContact(addContactInput: $addContactInput)
  }
`;

export default { ADD_CONTACT };
