"use client";

import { useMemo } from "react";
import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient
} from "@urql/next";

interface LayoutProps {
  children: React.ReactNode;
  token?: string;
}

export default function Layout({ children, token }: LayoutProps) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== "undefined"
    });
    const client = createClient({
      url: "http://localhost:4000/graphql",
      exchanges: [cacheExchange, ssr, fetchExchange],
      fetchOptions: {
        credentials: "include",
        headers: {
          "apollo-require-preflight": "true"
        }
      }
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
