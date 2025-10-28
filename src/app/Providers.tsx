"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}