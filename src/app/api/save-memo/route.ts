import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { memoTable } from '@/lib/db/schema';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    let { memoId, content } = body;
    if (!content || !memoId) {
      return new NextResponse('Missing content or memoId', { status: 400 });
    }

    memoId = parseInt(memoId);
    const memos = await db.select().from(memoTable).where(eq(memoTable.id, memoId));
    if (memos.length != 1) {
      return new NextResponse('failed to update', { status: 500 });
    }

    const memo = memos[0];
    if (memo.content !== content) {
      await db
        .update(memoTable)
        .set({
          content,
        })
        .where(eq(memoTable.id, memoId));
    }
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
