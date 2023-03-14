import { ApolloClient, InMemoryCache } from "@apollo/client";
import { USER_TOKEN_PERSIST } from "./constants";
export const client = () => {
  if (typeof window !== "undefined") {
    return new ApolloClient({
      uri: "http://localhost:3010/graphql",
      cache: new InMemoryCache(),
      headers: {
        authorization:
          `Bearer ${localStorage.getItem(USER_TOKEN_PERSIST)}` || "",
      },
    });
  }
  return new ApolloClient({
    uri: "http://localhost:3010/graphql",
    cache: new InMemoryCache(),
  });
};
