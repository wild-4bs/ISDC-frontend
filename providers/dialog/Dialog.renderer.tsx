"use client";
import { Dialog } from "@/components/ui/dialog";
import { useMemo } from "react";
import { useDialog } from "./Dialog.context";
import { DialogRendererProps } from "./index.types";

export const DialogRenderer = ({ registry }: DialogRendererProps) => {
  const { state, isOpen, closeDialog } = useDialog();

  const ActiveDialog = useMemo(
    () => (state.key ? (registry[state.key] ?? null) : null),
    [state.key, registry],
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      {ActiveDialog && (
        <ActiveDialog
          {...state.props}
          onSuccess={() => {
            state.props.onSuccess?.();
            closeDialog();
          }}
        />
      )}
    </Dialog>
  );
};
