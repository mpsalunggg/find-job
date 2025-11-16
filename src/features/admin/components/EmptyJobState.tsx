import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyJobStateProps {
  onCreateJob?: () => void;
}

export const EmptyJobState = ({ onCreateJob }: EmptyJobStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-8 w-full max-w-md">
        <Image
          src="/illustration/artwork.svg"
          alt="No job openings"
          width={400}
          height={300}
          className="mx-auto"
        />
      </div>

      <h2 className="mb-2 text-xl font-bold text-neutral-900">
        No job openings available
      </h2>

      <p className="mb-6 text-sm text-neutral-600">
        Create a job opening now and start the candidate process.
      </p>

      <Button
        variant="secondary-solid"
        size="lg"
        onClick={onCreateJob}
        className="rounded-lg"
      >
        Create a new job
      </Button>
    </div>
  );
};
