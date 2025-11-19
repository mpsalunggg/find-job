"use client";

import { useState } from "react";
import { JobFilter, SortOrder } from "../../../components/common/JobFilter";
import { RecruitmentCard } from "../components/RecruitmentCard";
import { EmptyJob } from "../components/EmptyJob";
import { JobCard } from "../components/JobCard";
import { JobOpeningDialog } from "../components/JobOpeningDialog";
import { useGetListJobs } from "../admin.hooks";
import { JobResponse } from "../admin.types";
import { SkeletonJobCard } from "../../../components/common/SkeletonJobCard";
import { useDebounce } from "@/hooks/useDebounce";

const JobListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedJob, setSelectedJob] = useState<JobResponse | undefined>(
    undefined
  );

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: jobs, isLoading: loadingJobs } = useGetListJobs(
    debouncedSearch,
    sortOrder as string
  );

  const handleCreateJob = () => {
    setDialogMode("create");
    setSelectedJob(undefined);
    setIsDialogOpen(true);
  };

  const handleDetail = (jobId: string) => {
    const job = jobs?.data.find((j) => j.id === jobId);
    if (job) {
      setDialogMode("edit");
      setSelectedJob(job);
      setIsDialogOpen(true);
    }
  };

  return (
    <section className="px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-12 gap-6">
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-9">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-neutral-900">Job List</h1>
            </div>
            <JobFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />

            {jobs?.data?.length === 0 && (
              <EmptyJob onCreateJob={handleCreateJob} />
            )}

            {loadingJobs ? (
              <SkeletonJobCard />
            ) : (
              (jobs?.data || [])?.length > 0 && (
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
                      onDetail={handleDetail}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        <div className="order-1 col-span-12 lg:order-2 lg:col-span-3">
          <RecruitmentCard onCreateJob={handleCreateJob} />
        </div>
      </div>

      <JobOpeningDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        jobData={selectedJob}
      />
    </section>
  );
};

export default JobListPage;
