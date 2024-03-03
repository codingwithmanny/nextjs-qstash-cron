// Imports
// ========================================================
import { sql } from "drizzle-orm";
import {
  text,
  sqliteTableCreator,
} from "drizzle-orm/sqlite-core";

// Config
// ========================================================
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `${process.env.DATABASE_PREFIX}_${name}`
);

// Tables
// ========================================================
export const messages = createTable("messages", {
  id: text("id").primaryKey().default(crypto.randomUUID()).notNull(),
  jobId: text("jobId"),
  message: text("message"),
  receivedAt: text("receivedAt"),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
