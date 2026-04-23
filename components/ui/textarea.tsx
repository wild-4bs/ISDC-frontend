import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { AlertCircle, Check } from "lucide-react";
import * as React from "react";

export const TextareaVariants = cva(
  [
    // Base styles
    "flex w-full min-w-0 font-medium text-base outline-none transition-[color,box-shadow]",
    "border-input-border bg-bg-input text-foreground",
    "placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",

    // Dark mode
    "dark:bg-input/30",

    // Disabled state
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

    // Focus state
    "focus-visible:border-primary/40 focus-visible:ring-primary/30 focus-visible:ring-[3px]",

    // Invalid state
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "dark:aria-invalid:ring-destructive/40",

    // Textarea-specific
    "field-sizing-content min-h-24 resize-y",
  ],
  {
    variants: {
      variant: {
        default: "rounded-md border",
        bordered: "border border-input-border",
        underline:
          "border-b border-b-input-border !rounded-none shadow-none resize-none",
        light:
          "rounded-md !bg-light-color dark:focus-visible:ring-primary/40 focus-visible:ring-black/10",
      },
      size: {
        default: "text-[1rem] px-4 py-3 md:text-sm",
        sm: "text-sm py-2 px-3",
        lg: "text-[1rem] py-4 px-5",
      },
      shape: {
        default: "rounded-md",
        pilled: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

export const Textarea = ({
  className,
  error,
  variant,
  size,
  shape,
  success,
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof TextareaVariants> & {
    error?: string[];
    success?: string[];
  }) => {
  return (
    <div className={clsx("flex flex-col")}>
      <div className="relative">
        <textarea
          data-slot="textarea"
          className={cn(
            TextareaVariants({
              variant,
              size,
              shape,
              className: cn("max-h-[200px]", className),
            }),
            {
              "border-invalid-color selection:bg-invalid-color/80 pr-8 focus-visible:ring-invalid-color/30 focus-visible:border-invalid-color":
                error && error.length > 0,
              "border-success-color selection:bg-success-color/80 pr-8 focus-visible:ring-success-color/30 focus-visible:border-success-color":
                success,
            },
          )}
          {...props}
        />
        {error && error.length > 0 && (
          <div className="absolute top-3 ltr:right-3 rtl:left-3 pointer-events-none text-invalid-color">
            <AlertCircle size={14} />
          </div>
        )}
        {success && (
          <div className="absolute top-3 ltr:right-3 rtl:left-3 pointer-events-none">
            <Check size={14} />
          </div>
        )}
      </div>

      {error && error.length > 0 && (
        <div className="mt-1 flex flex-col gap-1">
          {error.map((err, i) => (
            <span
              key={i}
              className="text-invalid-color font-medium text-xs first-letter:uppercase inline-block"
            >
              {err}
            </span>
          ))}
        </div>
      )}

      {success && success.length > 0 && (
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
};
