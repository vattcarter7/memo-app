import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { Env } from "@/constants/env";

const pool = new Pool({
  connectionString: Env.DATABASE_URL,
  ssl: true,
});

export const db = drizzle(pool);