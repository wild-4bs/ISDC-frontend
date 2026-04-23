"use client";
import { useGetPatientData } from "@/features/login/api/auth";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clear } = useUserStore();

  const { data, isError } = useGetPatientData();

  useEffect(() => {
    if (isError) {
      clear();
      return;
    }
    if (data?.payload) {
      setUser(data?.payload);
    }
  }, [data, isError]);

  return <>{children}</>;
}
