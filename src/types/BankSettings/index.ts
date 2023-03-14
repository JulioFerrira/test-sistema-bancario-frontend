import { IUserBankSettings } from "../UserBankSettings/index";
export interface IBankSettings {
  transferencePassword: string;
  bankName: string;
  contacts: IUserBankSettings[];
}
