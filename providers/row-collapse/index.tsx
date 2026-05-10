"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MediaStep } from "@/types/common";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { minBreakpointClasses, useRowCollapse } from "./index.exports";

// ─── Toggle ──────────────────────────────────────────────────────────────────

function RowToggle({
  children,
  revealPoint,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  revealPoint: MediaStep | "always";
}) {
  const { toggle, isOpen } = useRowCollapse();
  return (
    <Button
      type="button"
      data-state={isOpen ? "open" : "closed"}
      onClick={toggle}
      className={cn(
        className,
        revealPoint != "always" && minBreakpointClasses[revealPoint],
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function RowToggleIcon({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className?: string;
}) {
  const { isOpen } = useRowCollapse();
  return (
    <Icon
      className={cn(
        // Smooth spring-like rotation using a custom cubic-bezier
        "transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        isOpen && "rotate-90",
        className,
      )}
    />
  );
}

// ─── RowDetails.Item ─────────────────────────────────────────────────────────

function RowDetailsItem({
  label,
  children,
  className,
  revealPoint,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  revealPoint: MediaStep;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2 text-sm",
        className,
        minBreakpointClasses[revealPoint],
      )}
    >
      <span className="text-muted-foreground font-medium shrink-0">
        {label}:
      </span>
      <span className="text-foreground text-end">{children}</span>
    </div>
  );
}

// ─── RowDetails ──────────────────────────────────────────────────────────────

function RowDetails({
  children,
  colSpan = 999,
  className,
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  const { isOpen } = useRowCollapse();
  return (
    <TableRow
      className={clsx("hover:bg-transparent", {
        "[&_td]:border-transparent!": !isOpen,
      })}
    >
      <TableCell colSpan={colSpan} className="p-0">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -4 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -4 }}
              transition={{
                height: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                },
                opacity: {
                  duration: 0.2,
                  ease: "easeOut",
                  delay: isOpen ? 0.05 : 0,
                },
                y: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                },
              }}
              layout
              className="overflow-hidden"
            >
              <div className={cn("px-4 pb-3 pt-1", className)}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </TableCell>
    </TableRow>
  );
}

RowToggle.displayName = "RowToggle";
RowDetails.displayName = "RowDetails";
RowDetailsItem.displayName = "RowDetails.Item";

export { RowDetails, RowDetailsItem, RowToggle, RowToggleIcon };
