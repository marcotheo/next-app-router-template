import * as React from 'react';
import { getRevelantPosts } from '@/app/_server/actions/posts';

export default async function Posts() {
  const posts = await getRevelantPosts();

  return (
    <div className=''>
      {posts?.map((v) => (
        <div key={v.id} className='border-b border-gray-400 p-6'>
          {v.caption}
        </div>
      ))}
    </div>
  );
}
