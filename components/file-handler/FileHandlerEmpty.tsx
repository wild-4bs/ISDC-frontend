"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { useFileHandler } from "./context";

export const FileHandlerEmpty = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { file, files, mode } = useFileHandler();
  if (file || files?.length > 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const FileHandlerIcon = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { disabled } = useFileHandler();
  return (
    <div
      className={cn(
        "mb-3 text-muted-foreground",
        disabled && "opacity-40",
        className,
      )}
      {...props}
    >
      {children ?? <ImageIcon size={32} strokeWidth={1.5} />}
    </div>
  );
};

export const FileHandlerLabel = ({
  children,
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={cn("font-medium text-base leading-6 text-foreground", className)}
    {...props}
  >
    {children ?? "Drop your image here"}
  </span>
);

export const FileHandlerCaption = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  const { disabled } = useFileHandler();
  return (
    <p
      className={cn(
        "font-medium text-sm leading-5 text-muted-foreground",
        disabled && "opacity-40",
        className,
      )}
      {...props}
    >
      {children ?? "Maximum size 5MB · JPG, PNG, WEBP"}
    </p>
  );
};

export const FileHandlerCTAButton = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => {
  const { disabled } = useFileHandler();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        const label = (e.target as HTMLElement).closest("label");
        label?.control?.click();
      }}
      disabled={disabled}
      className={cn(
        "font-semibold text-base leading-6 text-primary hover:underline cursor-pointer",
        disabled && "opacity-40 no-underline",
        className,
      )}
      {...props}
    >
      {children ?? "Browse"}
    </button>
  );
};

export const FileHandlerDefaultContent = ({
  label,
  caption,
  cta,
  icon,
}: {
  label?: ReactNode;
  caption?: ReactNode;
  cta?: ReactNode;
  icon?: ReactNode;
}) => (
  <FileHandlerEmpty>
    <FileHandlerIcon>{icon}</FileHandlerIcon>
    <FileHandlerLabel>{label}</FileHandlerLabel>
    <FileHandlerCaption>{caption}</FileHandlerCaption>
    <FileHandlerCTAButton>{cta}</FileHandlerCTAButton>
  </FileHandlerEmpty>
);
