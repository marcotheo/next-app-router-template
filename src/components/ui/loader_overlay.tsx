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
      <div className='absolute left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]'>
        <span className='dotLoader' />
      </div>
    </>
  );
}
