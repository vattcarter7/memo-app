import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { memoTable } from '@/lib/db/schema';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('unauthorized', { status: 401 });
  }
  const body = await req.json();
  const { name } = body;

  const memo_ids = await db
    .insert(memoTable)
    .values({
      name,
      userId,
    })
    .returning({
      insertedId: memoTable.id,
    });

  return NextResponse.json({
    memo_id: memo_ids[0].insertedId,
  });
}
