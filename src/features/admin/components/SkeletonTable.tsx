import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <section className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-10 w-82" />
      <Skeleton className="h-80 w-full" />
    </section>
  );
};

export default SkeletonTable;
