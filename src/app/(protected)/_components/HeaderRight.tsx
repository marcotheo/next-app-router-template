import * as React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbLogout, TbUser } from 'react-icons/tb';
import { Menu } from './Menu';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogoutItem } from './LogoutItem';

export default async function HeaderRight() {
  const session = await getServerSession(options);

  if (!session?.cognito?.accessToken)
    return (
      <Link href='/login'>
        <Button>Sign In</Button>
      </Link>
    );

  return (
    <>
      <div className='hidden flex-row items-center justify-center gap-4 rounded-full bg-accessory p-2 text-white md:flex'>
        <Avatar className=''>
          <AvatarImage src='https://github.com/shadcn.pngss' />
          <AvatarFallback className='border-2 border-white bg-accessoryghost text-sm font-bold text-accessory'>MB</AvatarFallback>
        </Avatar>
        <h2 className='text-lg'>{session.cognito.username}</h2>
        <Menu />
      </div>

      <div className='md:hidden'>
        <Dialog>
          <DialogTrigger>
            <RxHamburgerMenu />
          </DialogTrigger>
          <DialogContent className='w-[90%] rounded-sm border-0 bg-primarybg text-gray-300'>
            <DialogHeader>
              <DialogTitle className='text-gray-300'>NAVIGATE</DialogTitle>
            </DialogHeader>
            <LogoutItem>
              <div className='sm flex w-full items-center rounded bg-accessory p-3'>
                <TbLogout className='mr-2 h-4 w-4' />
                <span>Sign Out</span>
              </div>
            </LogoutItem>
            <div className='sm flex w-full items-center rounded bg-accessory p-3'>
              <TbUser className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
