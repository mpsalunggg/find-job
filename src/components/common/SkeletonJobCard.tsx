import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonJobCard = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
};

export const SkeletonJobCardDetail = () => {
  return <Skeleton className="h-full w-full" />;
};
