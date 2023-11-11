import * as React from 'react';
import { TbLoader2 } from 'react-icons/tb';
import Overlay from './overlay';

export interface ILoaderOverlayProps {
  isLoading: boolean;
}

export default function LoaderOverlay(props: ILoaderOverlayProps) {
  if (!props.isLoading) return '';

  return (
    <>
      <Overlay />
      <div className='absolute left-[50%] top-[50%] z-50 flex flex-col items-center justify-center'>
        <TbLoader2 className='text-accessory2 absolute z-50 h-16  w-16 animate-spin' />
      </div>
    </>
  );
}
