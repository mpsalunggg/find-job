import { api } from "@/lib/axios";
import { CreateJobType, JobResponse, UpdateJobType } from "./admin.types";

export const jobService = {
  createJob: async (data: CreateJobType) => {
    return api.post("/admin/create-job", data);
  },

  updateJob: async (data: UpdateJobType) => {
    return api.put(`/admin/update-job/${data.id}`, data);
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
