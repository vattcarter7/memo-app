import type { Config } from 'drizzle-kit';
import { Env } from '@/constants/env';

export default {
  driver: 'pg',
  out: './migrations',
  schema: './src/lib/db/schema.ts',
  dbCredentials: {
    connectionString: Env.DATABASE_URL!,
  },
} satisfies Config;
