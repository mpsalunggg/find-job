"use client";
import { useQuery } from "@tanstack/react-query";
import { homeService } from "./home.service";

export const homeKeys = {
  all: ["public-jobs"] as const,
  list: (search?: string, sort?: string) =>
    ["public-jobs", "list", search, sort] as const,
};

export function useGetPublicJobs(search?: string, sort?: string) {
  return useQuery({
    queryKey: homeKeys.list(search, sort),
    queryFn: () => homeService.getPublicJobs(search, sort),
  });
}
