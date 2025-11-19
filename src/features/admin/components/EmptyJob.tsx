import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyJobProps {
  onCreateJob?: () => void;
}

export const EmptyJob = ({ onCreateJob }: EmptyJobProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-8 w-full max-w-md">
        <Image
          src="/illustration/artwork.svg"
          alt="No job openings"
          width={300}
          height={300}
          className="mx-auto w-[306px]"
        />
      </div>

      <h2 className="mb-2 text-center text-xl font-bold text-neutral-900">
        No job openings available
      </h2>

      <p className="mb-6 text-center text-sm text-neutral-600">
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
