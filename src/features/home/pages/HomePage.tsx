"use client";

import { useState, useMemo } from "react";
import CardDetailJob from "../components/CardDetailJob";
import { CardJobList } from "../components/CardJobList";
import { JobFilter, SortOrder } from "@/components/common/JobFilter";
import { useGetPublicJobs } from "../home.hook";
import { useDebounce } from "@/hooks/useDebounce";
import { PublicJobResponse } from "../home.type";
import {
  SkeletonJobCard,
  SkeletonJobCardDetail,
} from "@/components/common/SkeletonJobCard";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const debouncedSearch = useDebounce(searchQuery, 500);

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

  return (
    <section className="grid h-[calc(100vh-(--spacing(36)))] grid-cols-12 gap-6 px-4 md:px-10 lg:px-20">
      <div className="scrollbar-stroke col-span-12 h-full overflow-y-auto pr-3 lg:col-span-4">
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

      <div className="hidden h-full w-full lg:col-span-8 lg:block">
        {loadingDataJobs ? (
          <SkeletonJobCardDetail />
        ) : (
          <CardDetailJob job={selectedJob} />
        )}
      </div>
    </section>
  );
};
export default HomePage;
