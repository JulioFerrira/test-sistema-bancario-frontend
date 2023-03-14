import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "rsuite";
import { USER_TOKEN_PERSIST } from "../../config/constants";
import { useUser } from "../../context/user/user.context";

const isBrowser = typeof window !== "undefined";

const SiteLoader = ({ children }: any) => {
  const { userBankAccount } = useUser();
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const isAuthenticated = useCallback((): boolean => {
    const userToken = isBrowser && localStorage.getItem(USER_TOKEN_PERSIST);
    return !!userToken;
  }, []);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated());
    if (isAuthenticated() && userBankAccount) {
      router.replace("/app/home");
      setLoader(false);
    } else {
      router.replace("/");
      setLoader(false);
    }
  }, [userBankAccount, isAuthenticated]);

  if (loader) return <Loader>Cargando...</Loader>;
  return <>{children}</>;
};

export default SiteLoader;
