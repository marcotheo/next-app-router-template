import { useState } from 'react';
import { Control } from 'react-hook-form';
import { TbEye, TbEyeClosed, TbLock } from 'react-icons/tb';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';
import { PasswordReqList } from './passwordReqList';

export interface IPasswordInputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  wrapperCss?: string;
  withPasswordReqList?: boolean;
  isPassed?: boolean;
}

export default function PasswordInput({
  control,
  name,
  label,
  placeholder,
  description,
  wrapperCss,
  withPasswordReqList,
  isPassed,
}: IPasswordInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordPass, setIsPasswordPass] = useState(false);

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={wrapperCss ?? ''}>
            {label && <FormLabel className='text-md font-semibold'>{label}</FormLabel>}
            <FormControl>
              <div className='relative'>
                <TbLock className='absolute left-[-15px] h-full w-[50px] p-2 text-gray-400' />
                <Button
                  variant='none'
                  size='icon'
                  type='button'
                  className='absolute right-0'
                  onClick={() => setIsOpen(!isOpen)}
                  tabIndex={-1}
                >
                  {isOpen ? <TbEye className='text-gray-400' /> : <TbEyeClosed className='text-gray-400' />}
                </Button>
                <Input
                  placeholder={placeholder ?? ''}
                  type={isOpen ? 'text' : 'password'}
                  {...field}
                  className={'pl-8 text-lg'}
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
            {withPasswordReqList && <PasswordReqList passwordValue={field.value} setPass={(v) => setIsPasswordPass(v)} />}
          </FormItem>
        )}
      />
    </>
  );
}
