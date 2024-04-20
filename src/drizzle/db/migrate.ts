import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { createDbClient } from './client';

const { db, connection } = createDbClient({ max: 1 })

migrate(db, { migrationsFolder: "drizzle" }).then(() => {
  console.log("Migration done!")
}).catch((err) => {
  console.error("Migration failed", err)
}).finally(connection.end)

