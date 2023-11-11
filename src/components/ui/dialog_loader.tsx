"use client";

import * as React from "react";
import { TbLoader2 } from "react-icons/tb";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export default function Loader() {
  return (
    <>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80" />
      <div className="absolute left-[50%] top-[50%] z-50 flex flex-col items-center justify-center">
        <TbLoader2 className="absolute z-50 h-16 w-16  animate-spin text-accessory2" />
      </div>
    </>
  );
}
