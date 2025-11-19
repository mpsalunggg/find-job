import { useMutation, useQuery } from "@tanstack/react-query";
import { applicantService } from "./applicant.services";
import { ApplyJobPayload } from "./applicant.types";
import { toast } from "@/utils/toast";
import { ApiError } from "@/types/response.type";
import { useRouter } from "next/navigation";

export const applicantKey = {
  listFormField: (id: string) => ["list-form-field", id] as const,
  applyJob: ["apply-job"] as const,
};

export function useGetListFormFields(id: string) {
  return useQuery({
    queryKey: applicantKey.listFormField(id),
    queryFn: () => applicantService.getListFormField(id),
  });
}

export function useApplyJob() {
  const router = useRouter();
  return useMutation({
    mutationKey: applicantKey.applyJob,
    mutationFn: (data: ApplyJobPayload) => applicantService.applyJob(data),
    onSuccess: (response) => {
      toast.success(response.message);
      router.push("/applicant/success-apply");
    },
    onError: (error: ApiError) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
