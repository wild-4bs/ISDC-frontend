"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { DialogContextValue, DialogProps, DialogState } from "./index.types";

const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialog = (): DialogContextValue => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within a DialogProvider");
  return ctx;
};

// Provider
export const DialogProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<DialogState>({ key: null, props: {} });

  const openDialog = useCallback((key: string, props: DialogProps = {}) => {
    setState({ key, props });
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setState({ key: null, props: {} }), 200);
  }, []);

  return (
    <DialogContext.Provider value={{ state, openDialog, closeDialog, isOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
