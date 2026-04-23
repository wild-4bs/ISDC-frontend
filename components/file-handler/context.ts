import { createContext, useContext } from "react";
import { FileHandlerContextType } from "./index.types";

export const FileHandlerContext = createContext<FileHandlerContextType | null>(
  null,
);

export function useFileHandler() {
  const ctx = useContext(FileHandlerContext);
  if (!ctx) throw new Error("useFileHandler must be used within <FileHandler>");
  return ctx;
}
