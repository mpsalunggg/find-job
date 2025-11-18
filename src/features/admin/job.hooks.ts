"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobService } from "./job.services";
import type { ApiError } from "@/types/response.type";
import { CreateJobType, UpdateJobType } from "./job.types";
import { toast } from "@/utils/toast";

export const jobKeys = {
  createJob: ["create-job"] as const,
  updateJob: ["update-job"] as const,
  all: ["jobs"] as const,
  list: (search?: string, sort?: string) =>
    ["jobs", "list", search, sort] as const,
  detail: (id: string) => ["jobs", "detail", id] as const,
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
