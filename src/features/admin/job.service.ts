import { api } from "@/lib/axios";
import { CreateJobType, JobResponse } from "./job.type";

export const jobService = {
  createJob: async (data: CreateJobType) => {
    return api.post("/admin/create-job", data);
  },

  getListJobs: async (search?: string, sort?: string) => {
    return api.get<JobResponse[]>("/admin/get-list-job", {
      params: {
        search,
        sort,
      },
    });
  },
};
