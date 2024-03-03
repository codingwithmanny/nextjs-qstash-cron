// Imports
// ========================================================
// For postgres
// import Database from "postgres";
// import { drizzle } from 'drizzle-orm/postgres-js';
import Database from "better-sqlite3";
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "./schema";

// Exports
// ========================================================
export const db = drizzle(
  new Database(`${process.env.DATABASE_URL}`),
  { schema }
);