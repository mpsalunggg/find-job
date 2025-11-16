"use client";

import { useState } from "react";
import CardDetailJob from "../components/CardDetailJob";
import { CardJobList } from "../components/CardJobList";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  logo?: string;
  isNew?: boolean;
}

const DUMMY_JOBS: Job[] = [
  {
    id: "1",
    title: "UX Designer",
    company: "Rakamin",
    location: "Jakarta Selatan",
    salaryMin: 7000000,
    salaryMax: 15000000,
    isNew: true,
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Tech Company",
    location: "Jakarta Pusat",
    salaryMin: 8000000,
    salaryMax: 18000000,
    isNew: false,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Startup Indonesia",
    location: "Bandung",
    salaryMin: 6000000,
    salaryMax: 12000000,
    isNew: true,
  },
];

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [_selectedJob, setSelectedJob] = useState<Job>(DUMMY_JOBS[0]);

  const handleJobClick = (job: Job, index: number) => {
    setActiveIndex(index);
    setSelectedJob(job);
  };

  return (
    <section className="grid h-[calc(100vh-(--spacing(36)))] grid-cols-12 gap-6">
      <div className="scrollbar-stroke col-span-4 h-full overflow-y-auto pr-3">
        <div className="flex flex-col gap-4">
          {DUMMY_JOBS.map((job, index) => (
            <CardJobList
              key={job.id}
              job={job}
              isActive={activeIndex === index}
              onClick={() => handleJobClick(job, index)}
            />
          ))}
        </div>
      </div>

      <div className="col-span-8 h-full">
        <CardDetailJob />
      </div>
    </section>
  );
};
export default HomePage;
