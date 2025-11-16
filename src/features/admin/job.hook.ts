"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService } from "./job.service";
import type { ApiError } from "@/types/response.type";
import { CreateJobType } from "./job.type";
import { toast } from "@/utils/toast";

export const jobKeys = {
  createJob: ["create-job"] as const,
  list: () => ["list"] as const,
  detail: (id: string) => ["detail", id] as const,
};

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: jobKeys.createJob,
    mutationFn: (data: CreateJobType) => jobService.createJob(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.list() });
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
