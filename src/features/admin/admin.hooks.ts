"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobService } from "./admin.services";
import type { ApiError } from "@/types/response.type";
import { CreateJobType, UpdateJobType } from "./admin.types";
import { toast } from "@/utils/toast";

export const jobKeys = {
  createJob: ["create-job"] as const,
  updateJob: ["update-job"] as const,
  all: ["jobs"] as const,
  list: (search?: string, sort?: string) =>
    ["jobs", "list", search, sort] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
  applications: (
    jobId: string,
    page?: number,
    limit?: number,
    search?: string,
    status?: string
  ) => ["applications", jobId, page, limit, search, status] as const,
};

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: jobKeys.createJob,
    mutationFn: (data: CreateJobType) => jobService.createJob(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: jobKeys.updateJob,
    mutationFn: (data: UpdateJobType) => jobService.updateJob(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}

export function useGetListJobs(search?: string, sort?: string) {
  return useQuery({
    queryKey: jobKeys.list(search, sort),
    queryFn: () => jobService.getListJobs(search, sort),
  });
}

export function useGetListApplications(
  jobId: string,
  page?: number,
  limit?: number,
  search?: string,
  status?: string
) {
  return useQuery({
    queryKey: jobKeys.applications(jobId, page, limit, search, status),
    queryFn: () =>
      jobService.getListApplications(jobId, page, limit, search, status),
  });
}

export function useUpdateApplicationStatus(jobId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { applicationIds: string[]; status: string }) =>
      jobService.updateApplicationStatus(data),
    onSuccess: (response) => {
      // Invalidate all applications queries to refresh the list
      if (jobId) {
        queryClient.invalidateQueries({
          queryKey: jobKeys.applications(jobId),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      }
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
