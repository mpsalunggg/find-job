"use client";

import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon
            strokeWidth={2}
            className="text-success-main h-6 w-6"
          />
        ),
        info: (
          <InformationCircleIcon
            strokeWidth={2}
            className="text-primary-main h-5 w-5"
          />
        ),
        warning: (
          <ExclamationTriangleIcon
            strokeWidth={2}
            className="text-warning-main h-5 w-5"
          />
        ),
        error: (
          <XCircleIcon strokeWidth={2} className="text-danger-main h-5 w-5" />
        ),
        loading: (
          <ArrowPathIcon
            strokeWidth={2}
            className="text-muted-foreground h-5 w-5 animate-spin"
          />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group font-sans relative flex rounded-sm items-center gap-3 pl-3 pr-12 py-3 rounded-xl shadow-lg bg-white border-l-4 min-w-80",
          success: "border-l-success-main",
          error: "border-l-danger-main",
          warning: "border-l-warning-main",
          info: "border-l-primary-main",
          closeButton:
            "!absolute !right-2 !top-4 !bg-transparent !border-none !text-neutral-400 hover:!text-neutral-600 !cursor-pointer !p-1 !h-5 !w-5 !flex !items-center !justify-center",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
