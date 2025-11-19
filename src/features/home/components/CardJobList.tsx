import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import { formatSalary } from "@/utils/format";
import { PublicJobResponse } from "../home.types";

interface CardJobListProps {
  job: PublicJobResponse;
  isActive?: boolean;
  onClick?: () => void;
}

const CardJobList = ({ job, isActive = false, onClick }: CardJobListProps) => {
  return (
    <Card
      className={cn(
        "hover:border-primary-main cursor-pointer rounded-lg border p-0 shadow-none transition-all",
        isActive && "border-primary-main bg-primary-surface"
      )}
      onClick={onClick}
    >
      <CardContent className="px-4 py-3">
        <div className="flex gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border">
            <BuildingOffice2Icon className="text-primary-main h-7 w-7 drop-shadow-sm" />
            <div className="bg-secondary-main absolute right-1 bottom-1 h-2 w-2 rounded-full shadow ring-2 ring-white" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="truncate text-lg font-bold text-neutral-900">
              {job.title}
            </h3>
            <p className="truncate text-sm text-neutral-600">Company X</p>
          </div>
        </div>
        <Separator variant="dash" className="my-3" />
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-neutral-600">
            <MapPinIcon strokeWidth={2} className="h-4 w-4" />
            <span className="text-sm">Indonesia</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-600">
            <BanknotesIcon strokeWidth={2} className="h-4 w-4" />
            <span className="text-sm font-medium">
              {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardJobList;
