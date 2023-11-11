import * as React from 'react';
import LinkSwitch from './LinkSwitch';

export default function Header() {
  return (
    <div className='flex w-full justify-between bg-transparent p-6 text-4xl font-bold text-white'>
      <div className='hidden flex-row items-center justify-center gap-4 text-white md:flex'>
        <h1 className='font-quicksand text-4xl'>CROWD</h1>
      </div>

      <LinkSwitch />
    </div>
  );
}
