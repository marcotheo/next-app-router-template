import * as React from 'react';
import { TbCheck, TbX } from 'react-icons/tb';

export interface IAlertProps {
  type: 'error' | 'success';
  text: string;
}

const alertClasses = {
  success: 'rounded-lg bg-[#E8F3EF] p-6',
  error: 'bg-destructive rounded lg p-6',
};

const alertIcon = {
  success: () => <TbCheck className='text-accessory2 h-[22px] w-[22px]' />,
  error: () => <TbX className='h-[22px] w-[22px] text-red-300' />,
};

export default function Alert({ type, text }: IAlertProps) {
  return (
    <div className={alertClasses[type]}>
      <div className='flex gap-3'>
        {alertIcon[type]()}
        {text}
      </div>
    </div>
  );
}
