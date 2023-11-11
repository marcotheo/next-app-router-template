import { relations } from 'drizzle-orm';
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';
import { users } from '../users/schema';
import { comments } from '../comments/schema';

export const posts = mysqlTable('posts', {
  id: int('id').primaryKey().autoincrement(),
  caption: varchar('caption', { length: 256 }).unique(),
  userId: int('userId'),
});

export const postsRelation = relations(posts, ({ one, many }) => ({
  users: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));
