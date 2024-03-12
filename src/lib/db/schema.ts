import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const memoTable = pgTable('memos', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id').notNull(),
  content: text('content'),
});

export type MemoType = typeof memoTable.$inferInsert;
