import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      theme: {
        primary: "",
        secondary: "",
        danger: "",
        success: "",
        gray: "",
        warning: "",
      },
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        soft: "",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px] font-semibold [&>svg]:size-2.5",
        md: "px-2.5 py-0.5 text-xs font-medium [&>svg]:size-3",
        lg: "px-3 py-1 text-sm font-medium [&>svg]:size-3.5",
      },
    },
    compoundVariants: [
      {
        theme: "primary",
        variant: "solid",
        className: "bg-primary text-primary-foreground",
      },
      {
        theme: "primary",
        variant: "outline",
        className: "border-primary text-primary",
      },
      { theme: "primary", variant: "ghost", className: "text-primary" },
      {
        theme: "primary",
        variant: "soft",
        className: "bg-primary/10 text-primary",
      },

      // secondary
      {
        theme: "secondary",
        variant: "solid",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        theme: "secondary",
        variant: "outline",
        className: "border-secondary text-secondary-foreground",
      },
      {
        theme: "secondary",
        variant: "ghost",
        className: "text-secondary-foreground",
      },
      {
        theme: "secondary",
        variant: "soft",
        className: "bg-secondary/50 text-secondary-foreground",
      },

      // danger
      {
        theme: "danger",
        variant: "solid",
        className: "bg-destructive text-white",
      },
      {
        theme: "danger",
        variant: "outline",
        className: "border-destructive text-destructive",
      },
      { theme: "danger", variant: "ghost", className: "text-destructive" },
      {
        theme: "danger",
        variant: "soft",
        className: "bg-destructive/10 text-destructive",
      },

      // success
      {
        theme: "success",
        variant: "solid",
        className: "bg-green-600 text-white",
      },
      {
        theme: "success",
        variant: "outline",
        className: "border-green-600 text-green-600",
      },
      { theme: "success", variant: "ghost", className: "text-green-600" },
      {
        theme: "success",
        variant: "soft",
        className: "bg-green-600/10 text-green-600",
      },
      // gray
      {
        theme: "gray",
        variant: "solid",
        className:
          "bg-slate-900 text-slate-50 shadow-sm hover:bg-slate-800 active:bg-slate-950 transition-colors focus-visible:ring-slate-950",
      },
      {
        theme: "gray",
        variant: "outline",
        className:
          "border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 transition-colors focus-visible:ring-slate-400",
      },
      {
        theme: "gray",
        variant: "ghost",
        className:
          "text-slate-600 bg-transparent hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors focus-visible:ring-slate-400",
      },
      {
        theme: "gray",
        variant: "soft",
        className:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 transition-colors focus-visible:ring-slate-400",
      },
      // warning
      {
        theme: "warning",
        variant: "solid",
        className: "bg-amber-500 text-white",
      },
      {
        theme: "warning",
        variant: "outline",
        className: "border-amber-500 text-amber-600",
      },
      { theme: "warning", variant: "ghost", className: "text-amber-600" },
      {
        theme: "warning",
        variant: "soft",
        className: "bg-amber-500/10 text-amber-600",
      },
    ],
    defaultVariants: {
      theme: "primary",
      variant: "solid",
      size: "md",
    },
  },
);

export interface BadgeVariants {
  theme: "primary" | "secondary" | "danger" | "success" | "gray" | "warning";
  variant: "solid" | "outline" | "ghost" | "soft";
}

function Badge({
  className,
  theme,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ theme, variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
