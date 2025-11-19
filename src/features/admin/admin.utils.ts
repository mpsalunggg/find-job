import { JobStatus } from "@/generated/enums";

interface StatusDetermination {
  status: JobStatus;
  startedOn: Date | null;
}

export const determineJobStatus = (data: {
  title: string;
  jobType: string;
  description: string;
  numberOfCandidates: string;
  salaryMin?: string;
  salaryMax?: string;
}): StatusDetermination => {
  const isValid =
    data.title &&
    data.jobType &&
    data.description &&
    Number(data.numberOfCandidates) &&
    Number(data.salaryMin) > 0 &&
    Number(data.salaryMax) > 0;

  if (isValid) {
    return {
      status: JobStatus.ACTIVE,
      startedOn: new Date(),
    };
  }

  return {
    status: JobStatus.DRAFT,
    startedOn: null,
  };
};

export const generateSlug = (title: string): string => {
  const slugifiedTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);
  return `${slugifiedTitle}`;
};
