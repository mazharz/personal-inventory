"use client";

import { QueryProvider } from "@/lib/queries/provider";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export { ClientLayout };
