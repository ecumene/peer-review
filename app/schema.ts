import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const meets = sqliteTable("meets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
  orgId: text("org_id").notNull(),
  creatorId: text("creator_id").notNull(),
});
export const meetsRelations = relations(meets, ({ one, many }) => ({
  users: many(meetUsers),
  creator: one(meets, {
    fields: [meets.creatorId],
    references: [meets.id],
  }),
}));
export type Meet = InferSelectModel<typeof meets>;

export const meetUsers = sqliteTable("meet_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  meetId: integer("meet_id")
    .notNull()
    .references(() => meets.id),
  userId: text("user_id").notNull(),
});
export const meetUsersRelations = relations(meetUsers, ({ one }) => ({
  meet: one(meets, {
    fields: [meetUsers.meetId],
    references: [meets.id],
  }),
}));
export type MeetUser = InferSelectModel<typeof meetUsers>;

export const memos = sqliteTable("memos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
  orgId: text("org_id").notNull(),
  authorId: text("author_id").notNull(),
  assignedBy: text("assigned_by").notNull(),
});
export type Memo = InferSelectModel<typeof memos>;

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  memoId: integer("memo_id")
    .notNull()
    .references(() => memos.id),
  orgId: text("org_id").notNull(),
  authorId: text("author_id").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});
export type Comment = InferSelectModel<typeof comments>;
