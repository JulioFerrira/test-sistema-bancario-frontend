export interface IBankAccount {
  id: string;
  balance: number;
  accountNumber: string;
  accountType: string;
  interestRate?: number;
  moneyOutcomes?: number;
}

export interface ISavingsAccount extends IBankAccount {
  interestRate: number;
}

export interface ICheckingAccount extends IBankAccount {
  moneyOutcomes: number;
}
