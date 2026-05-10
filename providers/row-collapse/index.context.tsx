"use client";

import * as React from "react";

export interface RowCollapseContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const RowCollapseContext = React.createContext<RowCollapseContextValue | null>(
  null,
);

function useRowCollapse(): RowCollapseContextValue {
  const ctx = React.useContext(RowCollapseContext);
  if (!ctx)
    throw new Error("useRowCollapse must be used inside <RowCollapseProvider>");
  return ctx;
}

function RowCollapseProvider({
  children,
  onOpenChange,
}: {
  children?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = React.useCallback(() => {
    setIsOpen((v) => !v);
    onOpenChange?.(!isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <RowCollapseContext.Provider value={{ isOpen, toggle }}>
      {children}
    </RowCollapseContext.Provider>
  );
}

export { RowCollapseContext, RowCollapseProvider, useRowCollapse };
