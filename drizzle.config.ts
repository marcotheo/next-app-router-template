import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/app/_server/drizzle/**/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
} satisfies Config;
