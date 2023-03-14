import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = () => {
  if (typeof window !== "undefined") {
    return new ApolloClient({
      uri: "http://localhost:3010/graphql",
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}` || "",
      },
    });
  }
  return new ApolloClient({
    uri: "http://localhost:3010/graphql",
    cache: new InMemoryCache(),
  });
};
