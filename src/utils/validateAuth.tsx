import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_TOKEN_PERSIST } from "../config/constants";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthWrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem(USER_TOKEN_PERSIST);
      if (!token) {
        router.push("/");
      } else {
        router.push("/app/home");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
