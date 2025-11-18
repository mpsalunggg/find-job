"use client";

import { useMe } from "@/features/auth/auth.hooks";

export function useAuth() {
  const { data, isLoading, isError } = useMe();

  return {
    user: data?.data || null,
    isLoading,
    isAuthenticated: !isError && !!data?.data,
  };
}
