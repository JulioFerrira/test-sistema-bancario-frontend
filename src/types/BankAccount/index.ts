export interface IBankAccount {
  id: string;
  balance: number;
  accountNumber: string;
  accountType: string;
  bankName: string;
  interestRate?: number;
  moneyOutcomes?: number;
}

export enum EAccountType {
  SAVINGS = "SAVINGS",
  CHECKING = "CHECKING",
}
export interface ITransferToAccount {
  accountNumberTo: string;
  bankNameTo: string;
  emailTo: string;
  accountTypeTo: EAccountType;
  amount: number;
  password: string;
}

export interface IDepositToAccount {
  accountIdTo: string;
  accountTypeTo: EAccountType;
  amount: number;
  password: string;
}
export interface ISavingsAccount extends IBankAccount {
  interestRate: number;
}

export interface ICheckingAccount extends IBankAccount {
  moneyOutcomes: number;
}
