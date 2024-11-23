import { type Config } from "drizzle-kit";

// Copy of drizzle.config.ts without env.js since we would need the entire build system
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_FILE!,
  },
  out: "./drizzle",
  tablesFilter: ["matsu_*"],
} satisfies Config;
