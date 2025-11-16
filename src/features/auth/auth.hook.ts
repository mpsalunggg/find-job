"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "./auth.service";
import type { ApiError } from "@/types/response.type";
import { AuthType } from "./auth.schema";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";

export const authKeys = {
  all: ["auth"] as const,
  me: () => ["me"] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: AuthType) => authService.login(credentials),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success(response.message);
      router.push("/");
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: AuthType) => authService.register(credentials),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success(response.message);
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.me(), null);

      toast.success(response.message);
      router.push("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}

export function useMe(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),
    enabled,
    retry: false,
  });
}
