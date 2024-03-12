import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { memoTable } from '@/lib/db/schema';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('unauthorized', { status: 401 });
  }

  const { memoId } = await req.json();
  await db.delete(memoTable).where(eq(memoTable.id, parseInt(memoId)));
  return new NextResponse('ok', { status: 200 });
}
