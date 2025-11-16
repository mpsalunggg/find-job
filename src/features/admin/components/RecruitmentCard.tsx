import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@heroicons/react/24/outline";

interface RecruitmentCardProps {
  onCreateJob?: () => void;
}

export const RecruitmentCard = ({ onCreateJob }: RecruitmentCardProps) => {
  return (
    <Card className="relative w-full overflow-hidden border-none bg-[url('/images/bg-1.jpg')] bg-cover bg-center p-0 shadow-lg">
      <div className="absolute inset-0 bg-linear-to-br from-gray-900/80 to-gray-800/80" />
      <CardContent className="relative flex flex-col items-start justify-between p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">
            Recruit the best candidates
          </h3>
          <p className="text-sm text-white">
            Create jobs, invite, and hire with ease
          </p>
        </div>

        <Button
          variant="primary-solid"
          size="lg"
          onClick={onCreateJob}
          className="mt-6 w-full rounded-lg shadow-md"
        >
          Create a new job
        </Button>
      </CardContent>
    </Card>
  );
};
