import { relations } from 'drizzle-orm';
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { posts } from '../posts/schema';
import { comments } from '../comments/schema';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 256 }).unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));
