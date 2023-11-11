import * as React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Menu } from './Menu';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default async function HeaderRight() {
  const session = await getServerSession(options);

  if (!session?.cognito?.accessToken)
    return (
      <Link href='/login'>
        <Button>Sign In</Button>
      </Link>
    );

  return (
    <div className='flex flex-row items-center justify-center gap-4 rounded-full bg-accessory p-2 text-white'>
      <Avatar className=''>
        <AvatarImage src='https://github.com/shadcn.pngss' />
        <AvatarFallback className='border-2 border-white bg-accessoryghost text-sm font-bold text-accessory'>MB</AvatarFallback>
      </Avatar>
      <h2 className='text-lg'>{session.cognito.username}</h2>
      <Menu />
    </div>
  );
}
