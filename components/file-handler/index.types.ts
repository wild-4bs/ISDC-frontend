import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { FileHandlerVariants } from "./FileHandler";

export interface FileHandlerContextType {
  disabled: boolean;
  file: File | null;
  files: File[];
  mode: "single" | "multiple";
  onValueChange: (file: File | null) => void;
  onFilesChange: (files: File[]) => void;
  removeFile: (index: number) => void;
  isPending?: boolean;
}

type SingleProps =
  | { value: File | null; defaultValue?: never }
  | { defaultValue?: File | null; value?: never };

type MultipleProps =
  | { value: File[]; defaultValue?: never }
  | { defaultValue?: File[]; value?: never };

type ModeProps =
  | ({ mode?: "single" } & SingleProps & {
        onValueChange?: (file: File | null) => void;
        onFilesChange?: never;
      })
  | ({ mode: "multiple" } & MultipleProps & {
        onFilesChange?: (files: File[]) => void;
        onValueChange?: never;
      });

export type FileHandlerProps = {
  disabled?: boolean;
  children?: ReactNode;
  isPending?: boolean;
} & VariantProps<typeof FileHandlerVariants> &
  ModeProps;
