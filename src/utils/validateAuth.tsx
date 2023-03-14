import { gqlAuth } from "@/gql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_TOKEN_PERSIST } from "../config/constants";
import { IValidateTokenResponse } from "../gql/Auth/queries";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthWrapper = (props: P) => {
    const router = useRouter();

    useQuery<{
      revalidate: IValidateTokenResponse;
    }>(gqlAuth.queries.VALIDATE_TOKEN, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (!data) return;
        localStorage.setItem(USER_TOKEN_PERSIST, data.revalidate.token);
      },
      onError: (error) => {
        console.log(error);
        localStorage.removeItem(USER_TOKEN_PERSIST);
      },
    });

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
