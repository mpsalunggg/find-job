import { api } from "@/lib/axios";
import {
  ApplicationResponse,
  CreateJobType,
  JobResponse,
  UpdateJobType,
} from "./admin.types";
import { PaginatedData } from "@/types/response.type";

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

  getListApplications: async (
    jobId: string,
    page?: number,
    limit?: number,
    search?: string,
    status?: string
  ) => {
    return api.get<PaginatedData<ApplicationResponse>>(
      "/admin/get-list-applications",
      {
        params: {
          jobId,
          page,
          limit,
          search,
          status,
        },
      }
    );
  },

  updateApplicationStatus: async (data: {
    applicationIds: string[];
    status: string;
  }) => {
    return api.post("/admin/update-application-status", data);
  },
};
