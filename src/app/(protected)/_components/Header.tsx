import { Suspense } from 'react';
import HeaderRight from './HeaderRight';
import DotsBounce from '@/components/ui/dot_bounce';

export default function Header() {
  return (
    <div className='flex w-full justify-between bg-transparent p-6 text-4xl font-bold text-white'>
      <div className='hidden flex-row items-center justify-center gap-4 text-white md:flex'>
        <h1 className='bg-gradient-to-br from-fuchsia-500 to-accessory bg-clip-text text-5xl font-extrabold text-transparent'>
          CROWD
        </h1>
      </div>

      <Suspense
        fallback={
          <div className='flex items-center space-x-1'>
            <h1 className='text-md'>Loading</h1>
            <DotsBounce />
          </div>
        }
      >
        <HeaderRight />
      </Suspense>
    </div>
  );
}
