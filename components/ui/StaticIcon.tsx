import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const StaticIconVariants = cva("flex items-center justify-center p-2", {
  variants: {
    theme: {
      primary: "",
      secondary: "",
      danger: "",
      success: "",
    },
    shape: {
      circular: "rounded-full",
      square: "rounded-lg",
    },
    variant: {
      solid: "",
      soft: "",
      outline: "border bg-transparent",
      ghost: "bg-transparent",
    },
    size: {
      default: "size-10 [&_svg]:size-[75%]",
      sm: "size-8 [&_svg]:size-[75%]",
      lg: "size-12 [&_svg]:size-[75%]",
    },
  },
  compoundVariants: [
    // primary
    {
      theme: "primary",
      variant: "solid",
      className: "bg-primary text-primary-foreground",
    },
    {
      theme: "primary",
      variant: "soft",
      className: "bg-primary/10 text-primary",
    },
    {
      theme: "primary",
      variant: "outline",
      className: "border-primary text-primary",
    },
    { theme: "primary", variant: "ghost", className: "text-primary" },

    // secondary
    {
      theme: "secondary",
      variant: "solid",
      className: "bg-secondary text-secondary-foreground",
    },
    {
      theme: "secondary",
      variant: "soft",
      className: "bg-secondary/30 text-secondary-foreground",
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

    // danger
    {
      theme: "danger",
      variant: "solid",
      className: "bg-destructive text-white",
    },
    {
      theme: "danger",
      variant: "soft",
      className: "bg-destructive/10 text-destructive",
    },
    {
      theme: "danger",
      variant: "outline",
      className: "border-destructive text-destructive",
    },
    { theme: "danger", variant: "ghost", className: "text-destructive" },

    // success
    {
      theme: "success",
      variant: "solid",
      className: "bg-green-600 text-white",
    },
    {
      theme: "success",
      variant: "soft",
      className: "bg-green-600/10 text-green-600",
    },
    {
      theme: "success",
      variant: "outline",
      className: "border-green-600 text-green-600",
    },
    { theme: "success", variant: "ghost", className: "text-green-600" },
  ],
  defaultVariants: {
    theme: "primary",
    variant: "soft",
    size: "default",
    shape: "square",
  },
});

export const StaticIcon = ({
  className,
  theme,
  variant,
  size,
  shape,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof StaticIconVariants>) => {
  return (
    <div
      className={cn(
        StaticIconVariants({ theme, variant, size, shape }),
        className,
      )}
      {...props}
    />
  );
};
