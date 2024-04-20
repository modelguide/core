# Core - API for CPQ

## Development

### Elements
- *modules* - single functional unit in Nest.js, it encapsulates some logic and makes it _pluggable_ to some extent
- *dto (data transfer object)* - an structure that holds the data necessary to be moved or send around, eg. input data, api return data, incoming data
- *service* - structures that holds some application logic
- *resolver* - a graphql logic that implements how certain fields fetches the data
- `src/drizzle/schema.ts` - file that holds db schema


### How to run and develop

#### 1. Install dependencies
```
pnpm i
```

#### 1. Create .env
```
mv .env.sample .env
```

#### 3. Run database (postrgres)
```
docker run --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=pass123 -e POSTGRES_DB=cpq postgres
```

#### 4. Push structure
You can use this command whenever you want to force change structure in db, it skips the migrations (for dev purpose only)
```
pnpm run db:push
```

#### 5. Load seed data (optional)
```
pnpm run db:seed
```

#### 6. Run dev mode
```
pnpm run start:dev
```

### Additional commands
- `pnpm run db:studio` - runs drizzle studio (database UI)
- `pnpm run db:generate` - generates migrations
- `pnpm run db:migrate` - runs migrations