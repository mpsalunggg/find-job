"use client";

import { useMe } from "@/features/auth/auth.hook";

export function useAuth() {
  const { data, isLoading, isError } = useMe();

  return {
    user: data?.data || null,
    isLoading,
    isAuthenticated: !isError && !!data?.data,
    hasRole: (role: string) => data?.data?.roles.includes(role) || false,
    hasAnyRole: (roles: string[]) =>
      roles.some((role) => data?.data?.roles.includes(role)) || false,
  };
}
