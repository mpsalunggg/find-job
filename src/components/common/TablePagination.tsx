"use client";
import React, { useMemo } from "react";
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePagination from "@/hooks/usePagination";

interface TablePaginationProps {
  itemsPerPage: number;
  currentPage?: number;
  totalPages?: number;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  itemsPerPage,
  currentPage = 1,
  totalPages = 1,
  className,
}) => {
  const {
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    pages,
    handlePageChange,
  } = usePagination({
    currentPage,
    totalPages,
    itemsPerPage,
  });

  const mobilePages = useMemo(() => {
    if (totalPages <= 1) return [];

    const mobilePagesList: number[] = [];

    if (totalPages === 1) {
      return [1];
    }

    if (totalPages === 2) {
      return [1, 2];
    }

    if (currentPage <= 2) {
      mobilePagesList.push(1, 2);
    } else if (currentPage >= totalPages - 1) {
      mobilePagesList.push(totalPages - 1, totalPages);
    } else {
      mobilePagesList.push(currentPage - 1, currentPage);
    }

    return mobilePagesList;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPrevPage && handlePageChange(prevPage!)}
              className={cn(
                "bg-primary-50 hover:bg-primary-main cursor-pointer hover:text-white",
                !hasPrevPage
                  ? "cursor-not-allowed opacity-50"
                  : "text-primary-main"
              )}
            />
          </PaginationItem>

          <div className="hidden items-center gap-1 sm:flex">
            {pages.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const isActive = page === currentPage;

              return (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={isActive}
                    className={cn("cursor-pointer", {
                      [buttonVariants({
                        variant: "default",
                        className:
                          "bg-primary-main hover:bg-primary-hover text-white shadow-none! hover:text-white",
                      })]: isActive,
                      "border bg-white text-neutral-900": !isActive,
                    })}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            {mobilePages.map((page) => {
              const isActive = page === currentPage;

              return (
                <PaginationItem key={`mobile-page-${page}`}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={isActive}
                    className={cn("cursor-pointer", {
                      [buttonVariants({
                        variant: "default",
                        className:
                          "bg-primary-main hover:bg-primary-hover text-white shadow-none! hover:text-white",
                      })]: isActive,
                      "border bg-white text-neutral-900": !isActive,
                    })}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() => hasNextPage && handlePageChange(nextPage!)}
              className={cn(
                "bg-primary-50 hover:bg-primary-main cursor-pointer hover:text-white",
                {
                  "cursor-not-allowed opacity-50": !hasNextPage,
                }
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
};
