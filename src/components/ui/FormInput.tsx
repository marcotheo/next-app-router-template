import { useState } from 'react';
import { Control } from 'react-hook-form';
import { IconType } from 'react-icons';
import { TbEye, TbEyeClosed } from 'react-icons/tb';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';

export interface IFormInputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  Icon?: IconType;
  wrapperCss?: string;
  type?: 'text' | 'password';
  isPasswordWithIcon?: boolean;
  required?: boolean;
}

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  description,
  Icon,
  wrapperCss,
  type = 'text',
  isPasswordWithIcon,
  required,
}: IFormInputProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                {Icon && <Icon className='absolute left-[-15px] h-full w-[50px] p-2 text-gray-400' />}
                {!!isPasswordWithIcon && type === 'password' && (
                  <Button
                    variant='none'
                    size='icon'
                    type='button'
                    className='absolute right-0'
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isOpen ? <TbEye className='text-gray-400' /> : <TbEyeClosed className='text-gray-400' />}
                  </Button>
                )}
                <Input
                  placeholder={placeholder ?? ''}
                  type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
                  {...field}
                  className={(Icon ? 'pl-8 ' : '') + 'text-lg'}
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
