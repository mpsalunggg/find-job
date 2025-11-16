import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatSalary } from "@/utils/format";
import { Tag } from "@/components/common/Tag";

interface JobCardProps {
  id: string;
  title: string;
  salaryMin: number;
  salaryMax: number;
  status: "active" | "inactive" | "draft";
  startDate?: string;
  onManageJob?: (jobId: string) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "danger";
    case "draft":
      return "warning";
    default:
      return "default";
  }
};

export const JobCard = ({
  id,
  title,
  salaryMin,
  salaryMax,
  status,
  startDate,
  onManageJob,
}: JobCardProps) => {
  return (
    <Card className="border border-none p-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-start gap-4">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center gap-3">
                <Tag size="sm" variant={getStatusVariant(status)} icon={false}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
                {startDate && (
                  <Tag size="sm" variant="default" icon={false}>
                    started on {formatDate(startDate)}
                  </Tag>
                )}
              </div>
              <div className="flex w-full items-end justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neutral-900">
                    {title}
                  </h3>
                  <p className="text-base text-neutral-700">
                    {formatSalary(salaryMin)} - {formatSalary(salaryMax)}
                  </p>
                </div>
                <Button
                  variant="primary-solid"
                  size="sm"
                  onClick={() => onManageJob?.(id)}
                  className="rounded-lg"
                >
                  Manage Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
