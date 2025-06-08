import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

export const createUrqlServer = (cookieHeader: string | undefined) => {
  const makeClient = () => {
    return createClient({
      url: "http://localhost:4000/graphql",
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: {
        credentials: "include",
        headers: {
          cookie: cookieHeader!
        }
      }
    });
  };

  const { getClient } = registerUrql(makeClient);
  return {
    getClient
  };
};
