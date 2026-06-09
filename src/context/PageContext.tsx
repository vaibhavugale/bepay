"use client";

import React, { createContext, useContext, useState } from "react";

interface PageContextType {
  label: string;
  setLabel: (label: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [label, setLabel] = useState("");
  return (
    <PageContext.Provider value={{ label, setLabel }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
