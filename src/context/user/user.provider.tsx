import { gqlUserBankSettings } from "@/gql";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { USER_TOKEN_PERSIST } from "../../config/constants";
import { IUserBankSettings } from "../../types/UserBankSettings/index";
import { UserContext } from "./user.context";

type ProfileProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
}) => {
  const [userBankSettings, setUserBankSettings] = useState<IUserBankSettings>();

  useQuery<{
    userBankSetting: IUserBankSettings;
  }>(gqlUserBankSettings.queries.GET_USER_BANK_SETTINGS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    variables: {
      accessToken:
        typeof window === "undefined"
          ? ""
          : localStorage.getItem(USER_TOKEN_PERSIST),
    },

    onCompleted: (data) => {
      if (!data) return;
      setUserBankSettings(data.userBankSetting);
    },
  });
  return (
    <UserContext.Provider
      value={{
        userBankAccount: userBankSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
