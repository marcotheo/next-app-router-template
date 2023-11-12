'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getServerSessionHelper } from '@/app/api/auth/[...nextauth]/options';
import { createPost, getRelevantPosts } from '../drizzle/posts';
import { createPostActionSchema } from './form_schema';

export const createPostAction = async (values: z.infer<typeof createPostActionSchema>) => {
  const session = await getServerSessionHelper();

  if (!session) return null;

  const data = createPostActionSchema.safeParse(values);

  if (!data.success) {
    console.log(data.error);
    throw 'invalid input';
  }

  const result = await createPost(session.userId, data.data.caption);

  revalidatePath('/');

  return result;
};

export const getRevelantPosts = async () => {
  const session = await getServerSessionHelper();

  if (!session) return null;

  const result = await getRelevantPosts(session.userId);
  return result;
};
