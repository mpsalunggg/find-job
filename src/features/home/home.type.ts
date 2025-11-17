export interface PublicJobResponse {
  id: string;
  title: string;
  jobType: string | null;
  description: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
}
