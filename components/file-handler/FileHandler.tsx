"use client";
import { cva } from "class-variance-authority";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { FileHandlerContext } from "./context";
import { FileHandlerProps } from "./index.types";

const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
};

const ACCEPTED_IMAGE_EXTENSIONS = "image/jpeg,image/png,image/webp";
const MAX_SIZE_MB = 5;

export const FileHandlerVariants = cva(
  [
    "group relative overflow-hidden flex flex-col items-center justify-center text-center",
    "bg-background cursor-pointer transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: "border-[1.4px] border-dashed border-input rounded-xl",
        solid: "border-[1.4px] border-input rounded-xl",
        ghost:
          "border-[1.4px] border-transparent rounded-xl hover:border-input",
        light:
          "border-[1.4px] border-dashed border-input rounded-xl !bg-light-color",
        danger:
          "border-[1.4px] border-dashed border-invalid-color rounded-xl !bg-invalid-color/10",
      },
      size: {
        default: "p-12 h-40",
        sm: "p-8 h-32",
        lg: "p-16 h-52",
      },
      shape: {
        default: "rounded-xl",
        pilled: "rounded-3xl",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

export const FileHandler = ({
  disabled = false,
  mode = "single",
  value,
  defaultValue,
  onValueChange,
  onFilesChange,
  children,
  className,
  variant,
  size,
  shape,
  isPending,
  ...props
}: Omit<ComponentProps<"div">, keyof FileHandlerProps> & FileHandlerProps) => {
  const isMultiple = mode === "multiple";
  const isControlled = value !== undefined;
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalFile, setInternalFile] = useState<File | null>(
    !isMultiple ? ((defaultValue as File | null | undefined) ?? null) : null,
  );
  const [internalFiles, setInternalFiles] = useState<File[]>(
    isMultiple ? ((defaultValue as File[] | undefined) ?? []) : [],
  );

  const file =
    isControlled && !isMultiple ? (value as File | null) : internalFile;
  const files = isControlled && isMultiple ? (value as File[]) : internalFiles;

  useEffect(() => {
    if (isControlled && !isMultiple && value === null && inputRef.current) {
      inputRef.current.value = "";
    }
    if (
      isControlled &&
      isMultiple &&
      (value as File[])?.length === 0 &&
      inputRef.current
    ) {
      inputRef.current.value = "";
    }
  }, [isControlled, isMultiple, value]);

  const handleFile = useCallback(
    (incoming: File | null) => {
      if (!incoming) {
        if (!isControlled) setInternalFile(null);
        onValueChange?.(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      if (incoming.size / (1024 * 1024) > MAX_SIZE_MB) {
        toast.error(`File exceeds ${MAX_SIZE_MB}MB limit`);
        return;
      }
      if (!isControlled) setInternalFile(incoming);
      onValueChange?.(incoming);
      if (inputRef.current) inputRef.current.value = "";
    },
    [isControlled, onValueChange],
  );

  const handleFiles = useCallback(
    (incoming: File[]) => {
      const valid = incoming.filter((f) => {
        if (f.size / (1024 * 1024) > MAX_SIZE_MB) {
          toast.error(`"${f.name}" exceeds ${MAX_SIZE_MB}MB limit`);
          return false;
        }
        return true;
      });
      if (!valid.length) return;
      const next = [
        ...(isControlled ? (value as File[]) : internalFiles),
        ...valid,
      ];
      if (!isControlled) setInternalFiles(next);
      onFilesChange?.(next);
      if (inputRef.current) inputRef.current.value = "";
    },
    [isControlled, internalFiles, value, onFilesChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = (isControlled ? (value as File[]) : internalFiles).filter(
        (_, i) => i !== index,
      );
      if (!isControlled) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [isControlled, internalFiles, value, onFilesChange],
  );

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (!accepted.length) return;
      if (isMultiple) {
        handleFiles(accepted);
      } else {
        handleFile(accepted[0]);
      }
    },
    [isMultiple, handleFile, handleFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    multiple: isMultiple,
    noClick: true,
    disabled,
  });

  return (
    <FileHandlerContext.Provider
      value={{
        disabled,
        file,
        files,
        mode,
        onValueChange: handleFile,
        onFilesChange: handleFiles,
        removeFile,
        isPending,
      }}
    >
      <label
        htmlFor={id}
        className={cn(
          FileHandlerVariants({ variant, size, shape }),
          isDragActive && "border-primary bg-primary/10",
          disabled && "pointer-events-none opacity-50",
          isPending && "pointer-events-none opacity-90",
          className,
        )}
        {...getRootProps()}
      >
        {children}
        <input
          {...(props as ComponentProps<"input">)}
          {...getInputProps({
            id,
            accept: ACCEPTED_IMAGE_EXTENSIONS,
            className: "hidden",
          })}
          ref={inputRef}
        />
      </label>
    </FileHandlerContext.Provider>
  );
};
