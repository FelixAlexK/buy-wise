import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas',
  dialect: 'turso',
  dbCredentials: {

    url: Bun.env.TURSO_DATABASE_URL!,
    authToken: Bun.env.TURSO_AUTH_TOKEN!,
  },
})
