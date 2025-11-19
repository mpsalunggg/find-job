import z from "zod";

export const ProfileFieldRequirementSchema = z.enum([
  "MANDATORY",
  "OPTIONAL",
  "OFF",
]);

export const ProfileFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  fieldType: z.string(),
  placeholder: z.string().nullable(),
  helpText: z.string().nullable(),
  requirement: ProfileFieldRequirementSchema,
  order: z.number(),
});

export const JobFormSchema = z
  .object({
    title: z.string().min(1, "Job name is required"),
    jobType: z.string().min(1, "Job type is required"),
    description: z.string().min(1, "Job description is required"),
    numberOfCandidates: z
      .string()
      .min(1, "Number of candidates is required")
      .refine((val) => Number(val) > 0, {
        message: "Number of candidates must be greater than 0",
      }),
    salaryMin: z
      .string()
      .optional()
      .refine((val) => !val || Number(val) > 0, {
        message: "Salary min must be greater than 0",
      }),
    salaryMax: z
      .string()
      .optional()
      .refine((val) => !val || Number(val) > 0, {
        message: "Salary max must be greater than 0",
      }),
  })
  .refine(
    (data) => {
      if (!data.salaryMin || !data.salaryMax) return true;
      return Number(data.salaryMax) > Number(data.salaryMin);
    },
    {
      message: "Salary max must be greater than salary min",
      path: ["salaryMax"],
    }
  );
