'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <div className='absolute left-[50%] top-[50%] flex max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center space-y-4'>
        <h1 className='text-7xl font-semibold text-red-500'>500</h1>
        <p className='text-center text-4xl text-red-400'>Something Went Wrong!</p>
        <Button className='bg-red-500 hover:bg-red-400' onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
