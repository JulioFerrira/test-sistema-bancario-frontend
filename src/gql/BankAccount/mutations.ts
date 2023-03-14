import { gql } from "@apollo/client";
import { EAccountType } from "../../types/BankAccount/index";

export interface ITransferToAccountInput {
  accountNumberTo: string;
  accountTypeTo: string;
  amount: number;
  bankNameTo: string;
  emailTo: string;
  transferencePassword: string;
}

export interface IDepositToAccountInput {
  accountIdTo: string;
  accountTypeTo: EAccountType;
  amount: number;
  transferencePassword: string;
}

const TRANSFER_TO_ACCOUNT = gql`
  mutation TransferBalance($transferBalanceInput: TransferBalanceInput!) {
    transferBalance(transferBalanceInput: $transferBalanceInput)
  }
`;

const DEPOSTI_TO_ACCOUNT = gql`
  mutation DepositBalance($depositBalanceInput: DepositBalanceInput!) {
    depositBalance(depositBalanceInput: $depositBalanceInput)
  }
`;

export default { TRANSFER_TO_ACCOUNT, DEPOSTI_TO_ACCOUNT };
