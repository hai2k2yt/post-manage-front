// @flow
"use client"

import * as React from 'react';
import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient= new QueryClient()

type Props = PropsWithChildren
const Providers = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Providers