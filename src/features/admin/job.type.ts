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
