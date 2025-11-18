import { useQuery } from "@tanstack/react-query";
import { applicantService } from "./applicant.services";

export const applicantKey = {
  listFormField: (id: string) => ["list-form-field", id] as const,
};

export function useGetListFormFields(id: string) {
  return useQuery({
    queryKey: applicantKey.listFormField(id),
    queryFn: () => applicantService.getListFormField(id),
  });
}
