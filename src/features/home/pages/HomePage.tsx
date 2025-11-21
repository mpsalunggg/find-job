"use client";

import { useState, useMemo } from "react";
import CardDetailJob from "../components/CardDetailJob";
import CardJobList from "../components/CardJobList";
import { JobFilter, SortOrder } from "@/components/common/JobFilter";
import { useGetPublicJobs } from "../home.hooks";
import useDebounced from "@/hooks/useDebounced";
import { PublicJobResponse } from "../home.types";
import {
  SkeletonJobCard,
  SkeletonJobCardDetail,
} from "@/components/common/SkeletonJobCard";
import { EmptyJob } from "../components/EmptyJob";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const debouncedSearch = useDebounced(searchQuery, 500);

  const { data: dataJobs, isLoading: loadingDataJobs } = useGetPublicJobs(
    debouncedSearch,
    sortOrder as string
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = useMemo(() => {
    return selectedJobId
      ? dataJobs?.data?.find((job) => job.id === selectedJobId)
      : dataJobs?.data?.[0];
  }, [selectedJobId, dataJobs?.data]);

  const handleJobClick = (job: PublicJobResponse, index: number) => {
    setActiveIndex(index);
    setSelectedJobId(job.id);
  };

  // if (dataJobs?.data?.length === 0) {
  //   return <EmptyJob />;
  // }

  return (
    <section className="grid h-[calc(100vh-(--spacing(36)))] grid-cols-12 gap-6 px-4 md:px-10 lg:px-20">
      <div className="scrollbar-stroke col-span-12 overflow-y-auto pr-3 lg:col-span-4">
        <div className="flex flex-col gap-4">
          <JobFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          {loadingDataJobs ? (
            <SkeletonJobCard />
          ) : (
            dataJobs?.data?.map((job, index) => (
              <CardJobList
                key={job.id}
                job={job}
                isActive={activeIndex === index}
                onClick={() => handleJobClick(job, index)}
              />
            ))
          )}
        </div>
      </div>

      <div
        className={cn(
          "h-full w-full",
          dataJobs?.data?.length === 0
            ? "col-span-12 lg:col-span-12"
            : "hidden lg:col-span-8 lg:block"
        )}
      >
        {dataJobs?.data?.length === 0 ? (
          <EmptyJob />
        ) : loadingDataJobs ? (
          <SkeletonJobCardDetail />
        ) : (
          <CardDetailJob job={selectedJob} />
        )}
      </div>
    </section>
  );
};
export default HomePage;
