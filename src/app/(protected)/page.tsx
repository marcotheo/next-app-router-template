import { Suspense } from 'react';
import Posts from './_components/Posts';
import AddPost from './_components/AddPost';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Home() {
  return (
    <main className='mx-auto flex w-[80%] flex-col justify-center space-y-5 pt-6 lg:w-[60%]'>
      <Suspense
        fallback={
          <>
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
          </>
        }
      >
        <div className='flex flex-col space-y-3'>
          <Posts />
        </div>
      </Suspense>

      <div className='absolute bottom-0 left-[50%] right-0 flex w-fit translate-x-[-50%] rounded-t-lg bg-secondary drop-shadow-xl'>
        <AddPost />
      </div>
    </main>
  );
}
