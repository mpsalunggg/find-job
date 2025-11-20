import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

export type SortOrder = "asc" | "desc" | null;

interface JobFilterProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  sortOrder?: SortOrder;
  onSortChange?: (order: SortOrder) => void;
}

export const JobFilter = ({
  searchQuery = "",
  onSearchChange,
  sortOrder,
  onSortChange,
}: JobFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (order: SortOrder) => {
    onSortChange?.(order);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <Input
            type="search"
            placeholder="Search by job details"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <MagnifyingGlassIcon
            strokeWidth={2}
            className="text-primary-main absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2"
          />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="default"
              className="h-10 gap-2 border-2 border-neutral-300"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              Sort
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="flex flex-col gap-1">
              <Button
                variant={sortOrder === "asc" ? "primary-solid" : "ghost"}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleSortChange("asc")}
              >
                <ArrowUpIcon className="h-4 w-4" />
                Ascending (A-Z)
              </Button>
              <Button
                variant={sortOrder === "desc" ? "primary-solid" : "ghost"}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleSortChange("desc")}
              >
                <ArrowDownIcon className="h-4 w-4" />
                Descending (Z-A)
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
