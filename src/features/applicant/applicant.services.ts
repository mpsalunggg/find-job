import { api } from "@/lib/axios";
import { ListFormFieldResponse } from "./applicant.types";

export const applicantService = {
  getListFormField: async (id: string) => {
    return api.get<ListFormFieldResponse>(
      `/applicant/get-list-form-field/${id}`
    );
  },
};
