"use client";

import { useMemo, useState } from "react";
import { TableData } from "@/components/common/TableData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useQueryParams from "@/hooks/useQueryParams";
import { tableListCandidateColumns } from "./TableListCandidate.columns";
import { APPLICATION_STATUS_LABELS } from "../admin.constants";
import { ApplicationResponse } from "../admin.types";
import type { RowSelectionState } from "@tanstack/react-table";
import { EmptyCandidate } from "@/components/common/EmptyCandidate";

interface TableListCandidateProps {
  data: ApplicationResponse[];
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  jobId?: string;
}

const TableListCandidate = ({
  data,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  // jobId,
}: TableListCandidateProps) => {
  const { getParam, setParams } = useQueryParams();
  const statusFromUrl = getParam("status", "");
  const statusFilter = statusFromUrl || "all";
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleStatusChange = (value: string) => {
    const statusValue = value === "all" || !value ? null : value;
    setParams({
      status: statusValue,
      page: 1,
    });
  };

  const columns = useMemo(() => tableListCandidateColumns(), []);

  const selectedRows = useMemo(() => {
    return Object.keys(rowSelection).filter((key) => rowSelection[key]);
  }, [rowSelection]);

  const statusFilterComponent = (
    <div className="flex items-center gap-2">
      {selectedRows.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="bg-primary-main hover:bg-primary-hover text-white"
            >
              Update Status ({selectedRows.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">soon</PopoverContent>
        </Popover>
      )}
      <Select value={statusFilter || "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <TableData<ApplicationResponse>
      data={data}
      columns={columns}
      searchable
      searchPlaceholder="Search by name, email, or phone..."
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalPages={totalPages}
      rightAction={statusFilterComponent}
      getRowId={(row) => row.id}
      enableColumnResizing
      enableColumnReordering
      enableRowSelection
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      emptyState={<EmptyCandidate />}
    />
  );
};

export default TableListCandidate;
