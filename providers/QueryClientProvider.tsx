"use client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";
import { toast } from "sonner";

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err: any) => {
            if (!err?.errorFields && err?.message) {
              toast.error(err.message || "حدث خطأ أثناء تحميل البيانات");
            }
          },
        }),
        defaultOptions: {
          mutations: {
            onError: (err) => {
              if (!err?.errorFields && err?.message) {
                toast.error(
                  err?.message ||
                    "عذراً، لم نتمكن من إتمام العملية حالياً. يرجى المحاولة مرة أخرى.",
                );
              }
            },
          },
        },
      }),
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
