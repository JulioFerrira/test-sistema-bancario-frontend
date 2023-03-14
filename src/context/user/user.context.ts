import { createContext, useContext } from "react";
import { IUserBankSettings } from "../../types/UserBankSettings/index";

interface IUserContext {
  userBankAccount?: IUserBankSettings;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUser = () => useContext(UserContext);
