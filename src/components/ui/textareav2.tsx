import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'fill' | 'line';
  placeholder?: string;
}

const TextareaV2 = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ variant, placeholder, style, ...props }, ref) => {
  const css = variant === 'fill' ? 'border-2 border-transparent' : 'border-b-2 border-gray-500 ';

  return (
    <TextareaAutosize
      className={cn(
        css +
          'flex  w-full bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground hover:border-accessory focus:border-accessory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      )}
      {...props}
      placeholder={placeholder}
      ref={ref}
    />
  );
});
TextareaV2.displayName = 'TextareaV2';

export { TextareaV2 };
