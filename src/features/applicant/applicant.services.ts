import { api } from "@/lib/axios";
import { ApplyJobPayload, ListFormFieldResponse } from "./applicant.types";

export const applicantService = {
  getListFormField: async (id: string) => {
    return api.get<ListFormFieldResponse>(
      `/applicant/get-list-form-field/${id}`
    );
  },
  applyJob: async (data: ApplyJobPayload) => {
    return api.post("/applicant/apply-job", data);
  },
};
