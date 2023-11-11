import { eq } from 'drizzle-orm';
import { db } from '..';
import { users } from './schema';

export const createUsers = async (username: string) => {
  const userResult = await db.insert(users).values({ username });
  return userResult;
};

export const getUserByUsername = async (username: string) => {
  const user = await db.select().from(users).where(eq(users.username, username));
  return user;
};
