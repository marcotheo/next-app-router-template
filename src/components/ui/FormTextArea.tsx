import { useState } from "react";
import { Control } from "react-hook-form";
import { IconType } from "react-icons";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./form";
import { Textarea } from "@/components/ui/textarea";

export interface IFormInputProps {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  wrapperCss?: string;
  required?: boolean;
}

export default function FormTextArea({ control, name, label, placeholder, description, wrapperCss, required }: IFormInputProps) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={wrapperCss ?? ""}>
            <FormLabel className="text-md font-semibold">
              {label} {!!required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative overflow-hidden">
                <Textarea
                  placeholder={placeholder ?? ""}
                  {...field}
                  className={"text-lg transition-[border] duration-75 ease-out hover:border-accessory2 focus:border-accessory2"}
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
