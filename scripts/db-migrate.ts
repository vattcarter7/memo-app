import { db } from '@/lib/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function main() {
  console.log('Migration starting...');
  await migrate(db, {
    migrationsFolder: './migrations',
  });
  console.log('Migration completed ✅');
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed 🚨');
  console.log(error);
  process.exit(1);
});
