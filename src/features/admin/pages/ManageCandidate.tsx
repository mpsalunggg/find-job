"use client";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetListApplications } from "../admin.hooks";
import TableListCandidate from "../components/TableListCandidate";
import useQueryParams from "@/hooks/useQueryParams";
import SkeletonTable from "../components/SkeletonTable";
import { Card, CardContent } from "@/components/ui/card";

const ManageCandidatePage = () => {
  const params = useParams();
  const { getParam, getNumberParam } = useQueryParams();

  const jobId = params.id as string;
  const page = getNumberParam("page", 1);
  const limit = getNumberParam("limit", 10);
  const search = getParam("search", "");
  const status = getParam("status", "");

  const { data: applications, isLoading: isLoadingApplications } =
    useGetListApplications(jobId, page, limit, search, status);

  const applicationsData = applications?.data;
  const jobTitle = applicationsData?.additional?.jobTitle;

  return (
    <section className="px-4 md:px-10 lg:px-20">
      <div className="flex flex-col gap-6">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link href="/admin/job-list">
              <h1 className="text-lg font-bold text-neutral-900 sm:text-xl md:text-2xl">
                Job List
              </h1>
            </Link>
            <ChevronRightIcon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Manage Candidate
            </Button>
          </div>

          {isLoadingApplications ? (
            <SkeletonTable />
          ) : (
            <>
              <div className="mb-4">
                <p className="text-xl font-bold text-neutral-800">{jobTitle}</p>
              </div>

              <Card className="rounded-md shadow-none">
                <CardContent>
                  <TableListCandidate
                    data={applicationsData?.items || []}
                    currentPage={applicationsData?.meta?.page || 1}
                    totalPages={applicationsData?.meta?.totalPages || 1}
                    itemsPerPage={applicationsData?.meta?.limit || 10}
                    // jobId={jobId}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default ManageCandidatePage;
