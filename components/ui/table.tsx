"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  breakpointClasses,
  minBreakpointClasses,
} from "@/providers/row-collapse/index.constants";
import { MediaStep } from "@/types/common";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full rounded-xl border overflow-x-auto p-0 bg-dashboard-bg shadow-dashboard-bg border-input/50">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "md:table-row-group",
        "bg-background border-t border-t-input/50 rounded-xl overflow-hidden",
        "[&_tr:last-child]:border-0",
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  breakpoint,
  reveal,
  ...props
}: React.ComponentProps<"th"> & {
  breakpoint?: MediaStep;
  reveal?: MediaStep;
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-start align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 text-sm",
        breakpoint && breakpointClasses[breakpoint],
        reveal && minBreakpointClasses[reveal],
        className,
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  breakpoint,
  reveal,
  ...props
}: React.ComponentProps<"td"> & {
  breakpoint?: MediaStep;
  reveal?: MediaStep;
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-3 px-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        breakpoint && breakpointClasses[breakpoint],
        reveal && minBreakpointClasses[reveal],
        className,
      )}
      {...props}
    />
  );
}
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
