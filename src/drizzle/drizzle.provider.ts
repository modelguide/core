import { createDbClient } from "./db/client"

export const DrizzleAsyncProvider = "drizzleProvider"

export const drizzleProvider = {
  provide: DrizzleAsyncProvider,
  useFactory: async () => {
    const { db } = createDbClient()

    return db
  },
  exports: [DrizzleAsyncProvider]
}
