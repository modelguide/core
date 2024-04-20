import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const createConnectionString = () => {
  const host = process.env.DB_HOST || 'localhost'
  const user = process.env.DB_USER || ''
  const password = process.env.DB_PASSWORD || ''
  const name = process.env.DB_NAME || ''

  return `postgres://${user}:${password}@${host}:5432/${name}`
}

export type DrizzleDb = PostgresJsDatabase<typeof schema>;

export const createDbClient = <T extends Record<string, postgres.PostgresType> = {}>(options: postgres.Options<T> = {}) => {
    const connection = postgres<T>(createConnectionString(), options);

  return {
    connection, 
    db: drizzle(connection, { schema }),
  }
}