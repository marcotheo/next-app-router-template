import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'fill' | 'line';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const css = props.variant === 'fill' ? 'border-2 border-transparent' : 'border-b-2 border-gray-500 ';

  return (
    <textarea
      className={cn(
        css +
          'flex min-h-[80px] w-full bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground hover:border-accessory focus:border-accessory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
