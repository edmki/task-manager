"use client";
import { DialogsProvider } from "@/contexts/dialogs";
import { SettingsProvider } from "@/contexts/settings";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type * as React from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <DialogsProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DialogsProvider>
    </SettingsProvider>
  );
}
