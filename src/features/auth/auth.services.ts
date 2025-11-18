import { api } from "@/lib/axios";
import type { AuthResponse, MeResponse } from "./auth.types";
import { AuthType } from "./auth.schemas";

export const authService = {
  login: async (data: AuthType) => {
    return api.post<AuthResponse, AuthType>("/auth/login", data);
  },

  register: async (data: AuthType) => {
    return api.post<AuthResponse, AuthType>("/auth/register", data);
  },

  logout: async () => {
    return api.post<null>("/auth/logout");
  },

  me: async () => {
    return api.get<MeResponse>("/auth/me");
  },
};
