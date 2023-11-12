import { useState } from 'react';
import { Control } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { IconType } from 'react-icons';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form';
import { Textarea } from '@/components/ui/textarea';
import { TextareaV2 } from './textareav2';

export interface IFormInputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
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
          <FormItem className={wrapperCss ?? ''}>
            {label && (
              <FormLabel className='text-md font-semibold'>
                {label} {!!required && <span className='text-red-500'>*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div className='relative overflow-hidden'>
                <TextareaV2 {...field} placeholder={placeholder} />
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
