// Imports
// ========================================================
import { type Config } from "drizzle-kit";
import { config } from "dotenv";

// Config
// ========================================================
config();

// Exports
// ========================================================
export default {
  schema: "./src/server/db/schema.ts",
  // for postgres
  // driver: "pg",
  driver: "better-sqlite",
  dbCredentials: {
    // for postgres
    // connectionString: ``,
    url: `${process.env.DATABASE_URL}`,
  },
  tablesFilter: [`${process.env.DATABASE_PREFIX}_*`],
  out: "./drizzle",
} satisfies Config;
