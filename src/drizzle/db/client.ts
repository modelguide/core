import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = "postgres://postgres:pass123@0.0.0.0:5432/cpq"

export type DrizzleDb = PostgresJsDatabase<typeof schema>;

export const createDbClient = <T extends Record<string, postgres.PostgresType> = {}>(options: postgres.Options<T> = {}) => {
    const connection = postgres<T>(connectionString, options);

  return {
    connection, 
    db: drizzle(connection, { schema }),
  }
}