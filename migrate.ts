import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";

async function main() {
  const sqlite = new Database(process.env.DATABASE_FILE);
  const db = drizzle(sqlite);

  console.log('Running migrations')

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log('Migrated successfully')

  process.exit(0)
}

main().catch((e) => {
    console.error('Migration failed')
    console.error(e)
    process.exit(1)
});