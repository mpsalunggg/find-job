import { ProfileFieldType } from "./admin.types";

// Todo: if there is time, this data will be dynamic
export const DEFAULT_PROFILE_FIELDS: ProfileFieldType[] = [
  {
    key: "photoUrl",
    label: "Photo Profile",
    fieldType: "file",
    placeholder: null,
    helpText: "Recommended: 500x500px, max 2MB",
    requirement: "MANDATORY",
    order: 0,
  },
  {
    key: "fullName",
    label: "Full name",
    fieldType: "text",
    placeholder: "Enter your full name",
    helpText: "Enter your full legal name",
    requirement: "MANDATORY",
    order: 1,
  },
  {
    key: "dateOfBirth",
    label: "Date of birth",
    fieldType: "date",
    placeholder: "Select date of birth",
    helpText: null,
    requirement: "MANDATORY",
    order: 2,
  },
  {
    key: "gender",
    label: "Pronoun (gender)",
    fieldType: "radio",
    placeholder: null,
    helpText: null,
    requirement: "MANDATORY",
    order: 3,
  },
  {
    key: "domicile",
    label: "Domicile",
    fieldType: "select",
    placeholder: "Choose your domicile",
    helpText: null,
    requirement: "MANDATORY",
    order: 4,
  },
  {
    key: "phoneNumber",
    label: "Phone number",
    fieldType: "tel",
    placeholder: "81XXXXXXXXX",
    helpText: null,
    requirement: "MANDATORY",
    order: 5,
  },
  {
    key: "email",
    label: "Email",
    fieldType: "email",
    placeholder: "Enter your email",
    helpText: null,
    requirement: "MANDATORY",
    order: 6,
  },
  {
    key: "linkedinUrl",
    label: "Linkedin link",
    fieldType: "url",
    placeholder: "Ex. https://linkedin.com/in/example",
    helpText: "Enter your LinkedIn profile URL",
    requirement: "MANDATORY",
    order: 7,
  },
];

export const JOB_TYPES = [
  "Full-time",
  "Contract",
  "Part-time",
  "Internship",
  "Freelance",
];

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted",
  REVIEWING: "Reviewing",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  OFFERED: "Offered",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-blue-100 text-blue-800",
  REVIEWING: "bg-yellow-100 text-yellow-800",
  SHORTLISTED: "bg-purple-100 text-purple-800",
  INTERVIEW: "bg-indigo-100 text-indigo-800",
  OFFERED: "bg-green-100 text-green-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};
