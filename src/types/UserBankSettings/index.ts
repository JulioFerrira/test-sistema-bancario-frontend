import { IBankAccount } from "../BankAccount/index";
import { IBankSettings } from "../BankSettings/index";
import { IUser } from "../User/index";
export interface IUserBankSettings {
  id: string;
  user: IUser;
  bankSetting: IBankSettings;
  bankAccount: IBankAccount;
}
