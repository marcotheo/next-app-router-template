import { eq } from 'drizzle-orm';
import { db } from '..';
import { posts } from './schema';

export const createPost = async (userId: number, caption: string) => {
  await db.insert(posts).values({ userId, caption });
  return true;
};

export const getRelevantPosts = async (userId: number) => {
  const results = await db
    .select({
      id: posts.id,
      caption: posts.caption,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .where(eq(posts.userId, userId));
  return results;
};
