"use client";

import { useState } from "react";
import { JobListHeader, SortOrder } from "../components/JobListHeader";
import { RecruitmentCard } from "../components/RecruitmentCard";
import { EmptyJobState } from "../components/EmptyJobState";
import { JobCard } from "../components/JobCard";
import { JobOpeningDialog } from "../components/JobOpeningDialog";
import { useGetListJobs } from "../job.hook";

// const DUMMY_JOBS: Job[] = [
//   {
//     id: "1",
//     title: "Front End Developer",
//     salaryMin: 7000000,
//     salaryMax: 8000000,
//     status: "active",
//     startDate: "2025-10-01",
//   },
//   {
//     id: "2",
//     title: "Backend Developer",
//     salaryMin: 8000000,
//     salaryMax: 12000000,
//     status: "active",
//     startDate: "2025-09-15",
//   },
// ];

const JobListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: jobs, isLoading } = useGetListJobs();
  console.log(jobs);
  // const jobs = DUMMY_JOBS;

  const handleCreateJob = () => {
    setIsDialogOpen(true);
  };

  const handleManageJob = (jobId: string) => {
    console.log(jobId);
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              <JobListHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
              />

              {jobs?.data?.length === 0 && (
                <EmptyJobState onCreateJob={handleCreateJob} />
              )}

              {(jobs?.data || [])?.length > 0 && (
                <div className="space-y-4">
                  {jobs?.data.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      salaryMin={job.salaryMin}
                      salaryMax={job.salaryMax}
                      status={job.status}
                      startedOn={job.startedOn}
                      onManageJob={handleManageJob}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <RecruitmentCard onCreateJob={handleCreateJob} />
          </div>
        </div>
      </section>

      <JobOpeningDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default JobListPage;
