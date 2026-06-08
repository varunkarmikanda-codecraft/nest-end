import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  out: './src/modules/db/migrations',
  schema: './src/modules/db/schema.ts',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/backend',
  },
});
