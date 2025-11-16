"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

type Variant = "default" | "dash";

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  variant?: Variant;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        variant === "default" &&
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        variant === "dash" &&
          "border-border shrink-0 border-dashed " +
            "data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t " +
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-l",

        className
      )}
      {...props}
    />
  );
}

export { Separator };
