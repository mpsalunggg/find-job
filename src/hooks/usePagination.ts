import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const parseSearchParams = (searchString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  if (!searchString) return params;

  const pairs = searchString.replace(/^\?/, "").split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  });
  return params;
};

interface UsePaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  pages: (number | "ellipsis")[];
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPage: number;
}

function usePagination({
  currentPage,
  totalPages,
  itemsPerPage,
}: UsePaginationProps): PaginationData {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = parseSearchParams(searchParams.toString());

  const handlePageChange = (page: number) => {
    const updatedParams = {
      ...currentParams,
      page: page.toString(),
      limit: itemsPerPage.toString(),
    };
    router.replace(
      `${pathname}?${new URLSearchParams(updatedParams).toString()}`,
      { scroll: false }
    );
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    const updatedParams = {
      ...currentParams,
      limit: newItemsPerPage.toString(),
      page: "1",
    };
    router.replace(
      `${pathname}?${new URLSearchParams(updatedParams).toString()}`,
      { scroll: false }
    );
  };

  const pages = useMemo(() => {
    const pageNumbers: (number | "ellipsis")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push("ellipsis");
      }
    }

    return pageNumbers.filter((page, index, array) => {
      if (page === "ellipsis") {
        return array[index - 1] !== "ellipsis";
      }
      return true;
    });
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    pages,
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPage,
  };
}

export default usePagination;
