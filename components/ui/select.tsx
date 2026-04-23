"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle,
  CheckIcon,
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const selectTriggerVariants = cva(
  [
    "border-input w-full cursor-pointer font-medium text-[0.9rem] text-subtitle-color",
    "data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
    "flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs",
    "transition-[color,box-shadow] outline-none",
    "focus-visible:ring-[3px]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "border-input-border focus-visible:border-primary/40 focus-visible:ring-primary/30 bg-bg-input",
        background:
          "border-input-border focus-visible:border-primary/40 focus-visible:ring-primary/30 bg-background",
        error:
          "border-invalid-color focus-visible:border-invalid-color focus-visible:ring-invalid-color/20 ltr:pr-8! rtl:pl-8! bg-bg-input",
        success:
          "border-success-color focus-visible:border-success-color focus-visible:ring-success-color/20 ltr:pr-8! rtl:pl-8! bg-bg-input",
      },
      size: {
        default: "h-12",
        sm: "h-10",
        lg: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

function SelectTrigger({
  className,
  size,
  variant,
  error,
  success,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants> & {
    error?: string[];
    success?: string[];
  }) {
  const hasError = error && error.length > 0;
  const hasSuccess = success && success.length > 0;

  const resolvedVariant = hasError
    ? "error"
    : hasSuccess
      ? "success"
      : (variant ?? "default");

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          dir="rtl"
          className={cn(
            selectTriggerVariants({ variant: resolvedVariant, size }),
            className,
          )}
          {...props}
        >
          {children}
          {!hasError && !hasSuccess && (
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="size-4 text-subtitle-color shrink-0" />
            </SelectPrimitive.Icon>
          )}
        </SelectPrimitive.Trigger>
        {hasError && (
          <div className="absolute top-2/4 left-3 -translate-y-[46%] pointer-events-none">
            <AlertCircle size={14} className="text-invalid-color" />
          </div>
        )}
        {hasSuccess && !hasError && (
          <div className="absolute top-2/4 left-3 -translate-y-[46%] pointer-events-none">
            <CheckCircle size={14} className="text-invalid-color" />
          </div>
        )}
      </div>
      {hasError && (
        <div className="mt-1 flex flex-col gap-1">
          {error.map((err, i) => (
            <p
              key={i}
              className="text-invalid-color font-medium text-sm first-letter:uppercase inline-block"
            >
              {err}
            </p>
          ))}
        </div>
      )}
      {hasSuccess && !hasError && (
        <div className="mt-1 flex flex-col gap-1">
          {success.map((msg, i) => (
            <span
              key={i}
              className="text-success-color font-medium text-sm first-letter:uppercase inline-block"
            >
              {msg}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground relative z-50 max-h-75 min-w-32 overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent hover:bg-light-color cursor-pointer text-foreground focus:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full items-center flex-row-reverse gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute end-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
