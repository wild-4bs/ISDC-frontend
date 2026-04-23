import { ComponentType } from "react";

export interface DialogProps {
  onSuccess?: () => void;
  [key: string]: unknown;
}

export interface DialogState {
  key: string | null;
  props: DialogProps;
}

export interface DialogContextValue {
  state: DialogState;
  openDialog: (key: string, props?: DialogProps) => void;
  closeDialog: () => void;
  isOpen: boolean;
}

export type DialogRegistry = Record<string, ComponentType<DialogProps>>;

export interface DialogRendererProps {
  registry: DialogRegistry;
}
