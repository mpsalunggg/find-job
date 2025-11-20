import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
} from "../admin.constants";
import { ApplicationResponse } from "../admin.types";
import { Checkbox } from "@/components/ui/checkbox";

type ExtendedColumnDef<T> = ColumnDef<T> & {
  fixed?: "left" | "right";
};

export const tableListCandidateColumns =
  (): ExtendedColumnDef<ApplicationResponse>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 30,
      enableSorting: false,
      enableResizing: false,
      fixed: "left",
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      enableSorting: true,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("fullName") || "-"}</span>
      ),
      size: 200,
      fixed: "left",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-sm text-neutral-600">
          {row.getValue("email") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("phoneNumber") || "-"}</div>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      enableSorting: true,
      cell: ({ row }) => {
        const dob = row.getValue("dateOfBirth") as string | null;
        if (!dob) return <div className="text-sm">-</div>;
        try {
          const formatted = format(new Date(dob), "MMM dd, yyyy");
          return <div className="text-sm">{formatted}</div>;
        } catch {
          return <div className="text-sm">{dob}</div>;
        }
      },
    },
    {
      accessorKey: "domicile",
      header: "Domicile",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("domicile") || "-"}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-sm capitalize">
          {row.getValue("gender") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const label = APPLICATION_STATUS_LABELS[status] || status;
        const colorClass =
          APPLICATION_STATUS_COLORS[status] || "bg-gray-100 text-gray-800";

        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
          >
            {label}
          </span>
        );
      },
    },
  ];
