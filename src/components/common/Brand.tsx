import { cn } from "@/lib/utils";

export const Brand = ({ className }: { className?: string }) => {
  return (
    <h1 className={cn("text-primary-main text-4xl font-extrabold", className)}>
      Find<span className="text-secondary-main">Job</span>
    </h1>
  );
};
