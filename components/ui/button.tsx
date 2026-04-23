import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      theme: {
        primary: "",
        secondary: "",
        danger: "",
        success: "",
        gray: "",
      },
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        soft: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // primary
      {
        theme: "primary",
        variant: "solid",
        className:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
      },
      {
        theme: "primary",
        variant: "outline",
        className:
          "border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary",
      },
      {
        theme: "primary",
        variant: "ghost",
        className:
          "text-primary hover:bg-primary/10 focus-visible:ring-primary",
      },
      {
        theme: "primary",
        variant: "soft",
        className:
          "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary",
      },

      // secondary
      {
        theme: "secondary",
        variant: "solid",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
      },
      {
        theme: "secondary",
        variant: "outline",
        className:
          "border-secondary text-secondary-foreground hover:bg-secondary/10 focus-visible:ring-secondary",
      },
      {
        theme: "secondary",
        variant: "ghost",
        className:
          "text-secondary-foreground hover:bg-secondary/20 focus-visible:ring-secondary",
      },
      {
        theme: "secondary",
        variant: "soft",
        className:
          "bg-secondary/30 text-secondary-foreground hover:bg-secondary/50 focus-visible:ring-secondary",
      },

      // danger
      {
        theme: "danger",
        variant: "solid",
        className:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive",
      },
      {
        theme: "danger",
        variant: "outline",
        className:
          "border-destructive text-destructive hover:bg-destructive/10 focus-visible:ring-destructive",
      },
      {
        theme: "danger",
        variant: "ghost",
        className:
          "text-destructive hover:bg-destructive/10 focus-visible:ring-destructive",
      },
      {
        theme: "danger",
        variant: "soft",
        className:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive",
      },

      // success
      {
        theme: "success",
        variant: "solid",
        className:
          "bg-green-600 text-white hover:bg-green-600/90 focus-visible:ring-green-600",
      },
      {
        theme: "success",
        variant: "outline",
        className:
          "border-green-600 text-green-600 hover:bg-green-600/10 focus-visible:ring-green-600",
      },
      {
        theme: "success",
        variant: "ghost",
        className:
          "text-green-600 hover:bg-green-600/10 focus-visible:ring-green-600",
      },
      {
        theme: "success",
        variant: "soft",
        className:
          "bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600",
      },
      // Gray
      {
        theme: "gray",
        variant: "solid",
        className:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 active:scale-[0.98] transition-all focus-visible:ring-green-600",
      },
      {
        theme: "gray",
        variant: "outline",
        className:
          "border-green-600/50 text-green-600 bg-transparent hover:bg-green-50 hover:border-green-600 active:bg-green-100 focus-visible:ring-green-600",
      },
      {
        theme: "gray",
        variant: "ghost",
        className:
          "text-green-600 bg-transparent hover:bg-green-600/10 active:bg-green-600/15 focus-visible:ring-green-600",
      },
      {
        theme: "gray",
        variant: "soft",
        className:
          "bg-green-600/10 text-green-700 hover:bg-green-600/15 active:bg-green-600/25 focus-visible:ring-green-600",
      },
    ],
    defaultVariants: {
      theme: "primary",
      variant: "solid",
      size: "default",
    },
  },
);

export interface ButtonVariants {
  theme: "primary" | "secondary" | "danger" | "success" | "default" | "gray";
  variant: "solid" | "outline" | "ghost" | "soft";
}

function Button({
  className,
  theme,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ theme, variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
