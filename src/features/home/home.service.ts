import { api } from "@/lib/axios";
import type { PublicJobResponse } from "./home.type";

export const homeService = {
  getPublicJobs: async (search?: string, sort?: string) => {
    return api.get<PublicJobResponse[]>("/public/job-list", {
      params: {
        search,
        sort,
      },
    });
  },
};
