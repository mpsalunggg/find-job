import { cn } from "@/lib/utils";
import { TagIcon } from "@heroicons/react/24/outline";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center gap-2 rounded-[4px] px-4 py-2 text-sm font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border bg-white text-foreground ",
        primary: "border border-primary-border bg-white text-primary-main",
        "primary-solid": "bg-primary-main text-white",
        secondary:
          "border border-secondary-border bg-white text-secondary-main",
        "secondary-solid": "bg-secondary-main text-gray-800",
        success: "border border-success-border bg-white text-success-main",
        "success-solid": "bg-success-main text-white",
        danger: "border border-danger-border bg-white text-danger-main",
        "danger-solid": "bg-danger-main text-white",
        warning: "border border-warning-border bg-white text-warning-main",
        "warning-solid": "bg-warning-main text-white",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  icon?: boolean;
  iconComponent?: React.ReactNode;
}

export const Tag = ({
  className,
  variant,
  size,
  icon = true,
  iconComponent,
  children,
  ...props
}: TagProps) => {
  return (
    <div className={cn(tagVariants({ variant, size, className }))} {...props}>
      {icon && (iconComponent || <TagIcon className="h-4 w-4" />)}
      {children}
    </div>
  );
};
