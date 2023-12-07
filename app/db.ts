import { InferSelectModel, sql } from "drizzle-orm";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const sqlite = new Database("sqlite.db");
export const db: BetterSQLite3Database = drizzle(sqlite);

// Meets Table
export const meets = sqliteTable("meets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  due_date: integer("due_date", { mode: "timestamp" }).notNull(),
});
export type Meet = InferSelectModel<typeof meets>;

// Meet Users Table
export const meetUsers = sqliteTable("meet_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  meet_id: integer("meet_id")
    .notNull()
    .references(() => meets.id),
  user_id: text("user_id").notNull(),
});
export type MeetUser = InferSelectModel<typeof meetUsers>;

// Memos Table
export const memos = sqliteTable("memos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  due_date: integer("due_date", { mode: "timestamp" }).notNull(),
  author_id: text("author_id").notNull(),
  assigned_by: text("assigned_by").notNull(),
});
export type Memo = InferSelectModel<typeof memos>;

// Comments Table
export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  memo_id: integer("memo_id")
    .notNull()
    .references(() => memos.id),
  author_id: text("author_id").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});
export type Comment = InferSelectModel<typeof comments>;

// db.run(sql`CREATE TABLE meets (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     description TEXT NOT NULL,
//     due_date DATE NOT NULL
// );`);

// db.run(sql`CREATE TABLE meet_users (
//     meet_id INTEGER NOT NULL,
//     user_id TEXT NOT NULL,
//     FOREIGN KEY (meet_id) REFERENCES meets(id),
//     PRIMARY KEY (meet_id, user_id)
// );`);

// db.run(sql`CREATE TABLE memos (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     content TEXT NOT NULL,
//     due_date DATE NOT NULL,
//     author_id TEXT NOT NULL,
//     assigned_by TEXT NOT NULL
// );`);

// db.run(sql`CREATE TABLE comments (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     content TEXT NOT NULL,
//     memo_id INTEGER NOT NULL,
//     author_id TEXT NOT NULL,
//     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (memo_id) REFERENCES memos(id)
// );`);
