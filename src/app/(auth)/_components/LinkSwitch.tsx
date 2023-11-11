'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LinkSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  const activeCss = 'rounded-none font-semibold';
  const inactiveCss = 'rounded-none bg-gray-300 font-semibold text-black hover:bg-gray-200';

  return (
    <div className='hidden justify-end xs:flex'>
      <div className='flex overflow-hidden rounded-lg'>
        <Button className={pathname === '/login' ? activeCss : inactiveCss} onClick={() => router.push('/login')}>
          Sign In
        </Button>
        <Button className={pathname === '/register' ? activeCss : inactiveCss} onClick={() => router.push('/register')}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
