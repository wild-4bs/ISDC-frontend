"use client";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useFileHandler } from "./context";

export const FileHandlerImage = ({
  className,
  defaultImage,
  ...props
}: ComponentProps<"div"> & { defaultImage?: string }) => {
  const { file, files, mode, onValueChange, removeFile, disabled, isPending } =
    useFileHandler();

  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);

  useEffect(() => {
    if (!file) {
      setPreview(defaultImage ?? null);
    }
  }, [defaultImage]);

  useEffect(() => {
    if (mode === "multiple") return;
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, mode]);

  if (mode === "multiple") {
    if (!files.length) return null;
    return (
      <MultiplePreview
        files={files}
        removeFile={removeFile}
        disabled={disabled}
        isPending={isPending}
        className={className}
        {...props}
      />
    );
  }

  if (!preview) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden rounded-xl group",
        className,
      )}
      {...props}
    >
      {isPending && (
        <div className="absolute top-0 left-0 z-20 truncate pointer-events-none text-center flex items-center justify-center w-full h-full">
          <Spinner className="size-7 text-primary" strokeWidth={2.2} />
        </div>
      )}
      <Image
        src={preview}
        alt={file?.name ?? "image preview"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />
      {/* Filename tooltip — only shown when a new file is picked */}
      {file?.name && (
        <div className="z-10 absolute bottom-2 inset-x-2 truncate text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
          {file.name}
        </div>
      )}
      {!disabled && !isPending && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onValueChange(null);
            setPreview(null);
          }}
          className="absolute top-2 end-2 rounded-full bg-background/80 hover:bg-background cursor-pointer p-2 duration-200 flex items-center justify-center shadow-sm z-10"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
};

const MultiplePreview = ({
  files,
  removeFile,
  disabled,
  isPending,
  className,
  ...props
}: {
  files: File[];
  removeFile: (index: number) => void;
  disabled: boolean;
  isPending?: boolean;
} & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden rounded-xl",
        className,
      )}
      {...props}
    >
      <div className="w-full h-full overflow-y-auto p-2 flex flex-wrap gap-2 items-center justify-center">
        {isPending ? <Spinner className="size-6" /> : files?.length}
      </div>
    </div>
  );
};
