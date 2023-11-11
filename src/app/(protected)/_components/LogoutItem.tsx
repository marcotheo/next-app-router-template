'use client';

import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import { logoutAction } from '@/app/_server/actions/auth';

export const LogoutItem = ({ children }: { children: ReactNode }) => {
  const logout = async () => {
    try {
      await logoutAction();
      signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.log('logout action err', err);
    }
  };

  return (
    <div className='flex h-full w-full items-center' onClick={logout}>
      {children}
    </div>
  );
};
