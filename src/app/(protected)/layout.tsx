import { Suspense } from 'react';
import AuthRefresh from './_components/AuthRefresh';
import Header from './_components/Header';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full flex-col bg-gradient-to-b from-secondary to-primarybg'>
      <Suspense fallback={<div></div>}>
        <AuthRefresh />
      </Suspense>

      <Header />

      <div className='flex h-full'>
        <div className='mx-auto w-[100%] text-white md:w-[90%]'>{children}</div>
      </div>
    </div>
  );
}
