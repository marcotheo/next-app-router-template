import { relations } from 'drizzle-orm';
import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { users } from '../users/schema';
import { posts } from '../posts/schema';

export const comments = mysqlTable('comments', {
  id: int('id').primaryKey().autoincrement(),
  comment: varchar('comment', { length: 256 }),
  userId: int('userId'),
  postId: int('postId'),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).onUpdateNow(),
});

export const commentsRelation = relations(comments, ({ one }) => ({
  users: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  posts: one(posts, {
    fields: [comments.userId],
    references: [posts.id],
  }),
}));
