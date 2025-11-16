import { api } from "@/lib/axios";
import { CreateJobType } from "./job.type";

export const jobService = {
  createJob: async (data: CreateJobType) => {
    return api.post("/admin/create-job", data);
  },
};
