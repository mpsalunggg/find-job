import z from "zod";

import {
  JobFormSchema,
  ProfileFieldRequirementSchema,
  ProfileFieldSchema,
} from "./job.schema";

export type ProfileFieldRequirementType = z.infer<
  typeof ProfileFieldRequirementSchema
>;

export type ProfileFieldType = z.infer<typeof ProfileFieldSchema>;

export type JobFormType = z.infer<typeof JobFormSchema>;

export type CreateJobType = JobFormType & {
  profileFields: ProfileFieldType[];
};

export type UpdateJobType = CreateJobType & {
  id: string;
};

export interface JobProfileField {
  id: string;
  key: string;
  label: string;
  fieldType: string;
  placeholder: string;
  helpText: string | null;
  order: number;
  requirement: ProfileFieldRequirementType;
  validationRules: unknown | null;
}

export interface JobResponse {
  id: string;
  slug: string;
  title: string;
  jobType: string;
  description: string;
  numberOfCandidates: number;
  status: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  startedOn: string | null;
  createdAt: string;
  updatedAt: string;
  formFields: JobProfileField[];
}
