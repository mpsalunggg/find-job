import { Tag } from "@/components/common/Tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatJobType } from "@/utils/format";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { PublicJobResponse } from "../home.type";
import Link from "next/link";

interface CardDetailJobProps {
  job?: PublicJobResponse;
}

const CardDetailJob = ({ job }: CardDetailJobProps) => {
  return (
    <Card className="h-full rounded-lg border p-0 shadow-none">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border">
            <BuildingOffice2Icon className="text-primary-main h-7 w-7 drop-shadow-sm" />
            <div className="bg-secondary-main absolute right-1 bottom-1 h-2 w-2 rounded-full shadow ring-2 ring-white" />
          </div>
          <div className="flex w-full justify-between">
            <div className="space-y-2">
              <Tag icon={false} size="sm" variant="success-solid">
                {formatJobType(job?.jobType)}
              </Tag>
              <div>
                <p className="text-lg font-bold text-neutral-900">
                  {job?.title}
                </p>
                <span className="text-sm text-neutral-700">Company X</span>
              </div>
            </div>
            <Link href={`/applicant/apply/${job?.id}`}>
              <Button variant="secondary-solid" size="sm">
                Apply
              </Button>
            </Link>
          </div>
        </div>
        <Separator className="my-6" />
        {/* Todo: soon html content */}
        <span>{job?.description}</span>
      </CardContent>
    </Card>
  );
};
export default CardDetailJob;
