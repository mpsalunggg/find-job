"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  OnChangeFn,
  ColumnSizingState,
  ColumnOrderState,
  SortingState,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "./TablePagination";
import { TableToolbar } from "./TableToolbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import usePagination from "@/hooks/usePagination";
import useDebounced from "@/hooks/useDebounced";
import useQueryParams from "@/hooks/useQueryParams";

interface TableDataProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  className?: string;
  rightAction?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onSearchChange?: (search: string) => void;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: T) => string;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;
  enableToolbar?: boolean;
  onColumnOrderChange?: (columnOrder: string[]) => void;
  onColumnSizingChange?: (columnSizing: ColumnSizingState) => void;
  defaultColumnOrder?: string[];
  defaultColumnSizing?: ColumnSizingState;
  emptyState?: React.ReactNode;
}

export const TableData = <T extends object>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  itemsPerPage = 5,
  className,
  rightAction,
  currentPage = 1,
  totalPages = 1,
  onSearchChange,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  enableColumnResizing = false,
  enableColumnReordering = false,
  enableToolbar = true,
  onColumnOrderChange,
  onColumnSizingChange,
  defaultColumnOrder,
  defaultColumnSizing,
  emptyState,
}: TableDataProps<T>) => {
  const { getParam, setParams } = useQueryParams();
  const [searchValue, setSearchValue] = useState(getParam("search", ""));
  const debouncedSearchValue = useDebounced(searchValue, 500);
  const { handleItemsPerPageChange } = usePagination({
    currentPage,
    totalPages,
    itemsPerPage,
  });

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() => {
    if (defaultColumnOrder) {
      return defaultColumnOrder;
    }

    return columns
      .map((col) => {
        if (col.id) return col.id;

        if ("accessorKey" in col && typeof col.accessorKey === "string") {
          return col.accessorKey;
        }
        return null;
      })
      .filter((id): id is string => Boolean(id));
  });

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(
    defaultColumnSizing || {}
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (!defaultColumnOrder) {
      // Separate fixed and non-fixed columns
      const fixedLeft: string[] = [];
      const fixedRight: string[] = [];
      const nonFixed: string[] = [];

      columns.forEach((col) => {
        const fixed = (col as any)?.fixed;
        const id =
          col.id ||
          ("accessorKey" in col && typeof col.accessorKey === "string"
            ? col.accessorKey
            : null);

        if (id) {
          if (fixed === "left") {
            fixedLeft.push(id);
          } else if (fixed === "right") {
            fixedRight.push(id);
          } else {
            nonFixed.push(id);
          }
        }
      });

      // Fixed columns always stay in their position: fixedLeft first, then nonFixed, then fixedRight
      const newOrder = [...fixedLeft, ...nonFixed, ...fixedRight];
      setColumnOrder(newOrder);
    }
  }, [columns, defaultColumnOrder]);

  useEffect(() => {
    setParams({
      search: debouncedSearchValue || null,
      page: debouncedSearchValue ? 1 : currentPage,
    });

    if (onSearchChange) {
      onSearchChange(debouncedSearchValue);
    }
  }, [debouncedSearchValue, onSearchChange, currentPage]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }
    const activeHeader = visibleHeaders.find((h) => h.id === active.id);
    const overHeader = visibleHeaders.find((h) => h.id === over.id);
    const isActiveFixed = (activeHeader?.column.columnDef as any)?.fixed;

    const isOverFixed = (overHeader?.column.columnDef as any)?.fixed;

    if (isActiveFixed || isOverFixed) {
      return;
    }

    const fixedLeft: string[] = [];
    const fixedRight: string[] = [];
    const nonFixed: string[] = [];

    columnOrder.forEach((id) => {
      const header = visibleHeaders.find((h) => h.id === id);

      const fixed = (header?.column.columnDef as any)?.fixed;

      if (fixed === "left") {
        fixedLeft.push(id);
      } else if (fixed === "right") {
        fixedRight.push(id);
      } else {
        nonFixed.push(id);
      }
    });

    const oldIndex = nonFixed.indexOf(active.id as string);
    const newIndex = nonFixed.indexOf(over.id as string);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newNonFixed = arrayMove(nonFixed, oldIndex, newIndex);

      const newOrder = [...fixedLeft, ...newNonFixed, ...fixedRight];
      setColumnOrder(newOrder);

      if (onColumnOrderChange) {
        onColumnOrderChange(newOrder);
      }
    }
  };

  const handleColumnSizingChange = (updater: any) => {
    setColumnSizing((old) => {
      const newSizing = typeof updater === "function" ? updater(old) : updater;

      if (onColumnSizingChange) {
        setTimeout(() => {
          onColumnSizingChange(newSizing);
        }, 0);
      }

      return newSizing;
    });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableRowSelection,
    onRowSelectionChange,
    getRowId,

    enableSorting: true,
    enableColumnResizing,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    state: {
      rowSelection: rowSelection || {},
      columnOrder: enableColumnReordering ? columnOrder : undefined,
      columnSizing: enableColumnResizing ? columnSizing : undefined,
      sorting,
    },
    onColumnOrderChange: enableColumnReordering ? setColumnOrder : undefined,
    onColumnSizingChange: enableColumnResizing
      ? handleColumnSizingChange
      : undefined,
    onSortingChange: setSorting,
    defaultColumn: {
      size: 150,
      minSize: 50,
      // maxSize: 500,
    },
  });

  const SortableHeader = ({
    header,
    children,
    isFixedLeft,
    leftOffset,
    isLastFixed,
  }: {
    header: any;
    children: React.ReactNode;
    isFixedLeft?: boolean;
    leftOffset?: number;
    isLastFixed?: boolean;
  }) => {
    const isFixed = (header.column.columnDef as any)?.fixed;
    const isDragDisabled = !enableColumnReordering || !!isFixed;

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: header.id,
      disabled: isDragDisabled,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      position: isFixedLeft ? ("sticky" as const) : undefined,
      left: leftOffset,
      zIndex: isFixedLeft ? 40 : undefined,
      backgroundColor: isFixedLeft ? "hsl(var(--background))" : undefined,
      width: header.getSize(),
      minWidth: header.getSize(),
      maxWidth: header.getSize(),
    };

    return (
      <TableHead
        ref={setNodeRef}
        style={style}
        className={cn(
          "text-foreground group relative bg-[#FAFAFA] p-0 font-semibold"
        )}
        suppressHydrationWarning
        {...attributes}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-between gap-2 px-4",
            isFixedLeft && "bg-[#FAFAFA]",
            isLastFixed && "border-border border-r"
          )}
          {...(!isDragDisabled ? listeners : {})}
        >
          <div className="flex">{children}</div>
          {enableColumnReordering && !isFixed && (
            <div
              className="text-muted-foreground hover:text-foreground cursor-grab opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
              aria-label="Drag to reorder column"
            >
              <GripVertical className="h-4 w-4" />
            </div>
          )}
        </div>

        {enableColumnResizing && header.column.getCanResize() && (
          <div
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className={cn(
              "absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none",
              "hover:bg-primary/50 bg-transparent transition-colors",
              "active:bg-primary",
              "-mx-1 px-1"
            )}
            style={{
              userSelect: "none",
              touchAction: "none",
            }}
          />
        )}
      </TableHead>
    );
  };
  const visibleHeaders = useMemo(() => {
    return table.getHeaderGroups()[0]?.headers || [];
  }, [table, columnOrder]);

  const getFixedColumnOffset = (headerIndex: number) => {
    let offset = 0;
    for (let i = 0; i < headerIndex; i++) {
      const header = visibleHeaders[i];
      const isFixed = (header?.column.columnDef as any)?.fixed === "left";
      if (isFixed) {
        offset += header.getSize();
      }
    }
    return offset;
  };

  const isColumnFixed = (
    header: { column: { columnDef: { fixed?: "left" | "right" } } },
    position: "left" | "right"
  ) => {
    return header.column.columnDef?.fixed === position;
  };

  const isLastFixedLeftColumn = (headerIndex: number) => {
    const currentHeader = visibleHeaders[headerIndex];
    const isCurrentFixed =
      (currentHeader?.column.columnDef as any)?.fixed === "left";
    if (!isCurrentFixed) return false;

    const nextHeader = visibleHeaders[headerIndex + 1];
    if (!nextHeader) return true;
    const isNextFixed = (nextHeader?.column.columnDef as any)?.fixed === "left";
    return !isNextFixed;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {enableToolbar && (
        <TableToolbar
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
          }}
          rightAction={rightAction}
        />
      )}

      <div className="bg-background overflow-x-auto rounded-xs shadow-md">
        <DndContext
          sensors={enableColumnReordering ? sensors : undefined}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table className="w-full min-w-full">
            <TableHeader className="h-[62px] bg-[#FAFAFA]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="w-full bg-[#FAFAFA]"
                  suppressHydrationWarning
                >
                  <SortableContext
                    items={visibleHeaders.map((h) => h.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {visibleHeaders.map((header, index) => {
                      const isFixedLeft = isColumnFixed(
                        header as {
                          column: { columnDef: { fixed?: "left" | "right" } };
                        },
                        "left"
                      );
                      const leftOffset = isFixedLeft
                        ? getFixedColumnOffset(index)
                        : undefined;
                      const isLastFixed = isLastFixedLeftColumn(index);
                      return (
                        <SortableHeader
                          key={header.id}
                          header={header}
                          isFixedLeft={isFixedLeft}
                          leftOffset={leftOffset}
                          isLastFixed={isLastFixed}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center gap-1 uppercase">
                              <div
                                className={cn(
                                  "flex items-center gap-1",
                                  header.column.getCanSort() &&
                                    "cursor-pointer select-none"
                                )}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getCanSort() && (
                                  <span className="ml-1">
                                    {header.column.getIsSorted() === "asc" ? (
                                      <ArrowUp className="h-3 w-3" />
                                    ) : header.column.getIsSorted() ===
                                      "desc" ? (
                                      <ArrowDown className="h-3 w-3" />
                                    ) : (
                                      <ArrowUpDown className="h-3 w-3 opacity-50" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </SortableHeader>
                      );
                    })}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleHeaders.length}
                    className="text-muted-foreground h-24 text-center"
                  >
                    {emptyState || "No data found."}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const header = visibleHeaders[index];
                      const isFixedLeft = header
                        ? isColumnFixed(
                            header as {
                              column: {
                                columnDef: { fixed?: "left" | "right" };
                              };
                            },
                            "left"
                          )
                        : false;
                      const leftOffset = isFixedLeft
                        ? getFixedColumnOffset(index)
                        : undefined;
                      const isLastFixed = isLastFixedLeftColumn(index);
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                            left: leftOffset,
                          }}
                          className={cn(
                            "px-4",
                            isFixedLeft && "bg-background sticky",
                            isLastFixed &&
                              "border-border after:bg-border after:pointer-events-none after:absolute after:top-0 after:right-0 after:bottom-0 after:z-30 after:w-px"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground hidden text-sm lg:block">
            {currentPage} of {totalPages} pages
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                const newItemsPerPage = parseInt(value, 10);
                handleItemsPerPageChange(newItemsPerPage);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
