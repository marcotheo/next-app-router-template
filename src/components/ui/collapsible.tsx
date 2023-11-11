"use client";

import { ReactNode } from "react";

export const Collapsible = ({ children, open }: { open: boolean; children: ReactNode }) => {
  return (
    <div
      className={`${
        open ? "max-h-[300px] overflow-hidden" : "max-h-0 overflow-hidden"
      } transition-[max-height] duration-300 ease-in`}
    >
      {children}
    </div>
  );
};
