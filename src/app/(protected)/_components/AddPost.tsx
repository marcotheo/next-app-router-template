'use client';

import { useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PostForm from './PostForm';

export default function AddPost() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className='p-3' onClick={() => setOpen(true)}>
        <TbPlus className='h-6 w-6' />
      </DialogTrigger>
      <DialogContent className='w-[90%] rounded-sm border-0 bg-primarybg text-gray-300'>
        <DialogHeader>
          <DialogTitle className='text-gray-300'>CREATE POST</DialogTitle>
        </DialogHeader>
        <PostForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
