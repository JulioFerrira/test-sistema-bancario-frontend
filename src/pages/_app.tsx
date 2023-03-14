import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "rsuite/dist/rsuite.min.css";
import { client } from "../config/apollo";
import { UserProvider } from "../context/user/user.provider";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client()}>
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    </ApolloProvider>
  );
}
