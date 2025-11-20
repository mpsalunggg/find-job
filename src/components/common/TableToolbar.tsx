"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface TableToolbarProps {
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  rightAction?: React.ReactNode;
}

export const TableToolbar = ({
  searchable = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  rightAction,
}: TableToolbarProps) => {
  const { setParam } = useQueryParams();

  return (
    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
      <div className="w-full">
        {searchable && (
          <div className="relative w-full lg:max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder={searchPlaceholder}
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="h-9 pl-10"
            />
          </div>
        )}
      </div>

      {rightAction && <div className="w-full lg:w-auto">{rightAction}</div>}
    </div>
  );
};
