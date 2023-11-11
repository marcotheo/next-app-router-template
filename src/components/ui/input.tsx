import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'fill' | 'line';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const css = props.variant === 'fill' ? 'border-2 border-transparent' : 'border-b-2 border-gray-500 ';

  return (
    <input
      type={type}
      className={cn(
        css +
          'flex h-10 w-full rounded-[1px] bg-transparent px-3 py-2 text-sm text-white outline-none ring-offset-background transition-[border] duration-300 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-accessory focus:border-accessory disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
