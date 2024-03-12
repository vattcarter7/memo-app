import { auth } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import DeleteButton from '@/components/delete-button';
import TipTapEditor from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { memoTable } from '@/lib/db/schema';

type Props = {
  params: {
    memoId: string;
  };
};

const MemoPage = async ({ params: { memoId } }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/dashboard');
  }
  const memos = await db
    .select()
    .from(memoTable)
    .where(and(eq(memoTable.id, parseInt(memoId)), eq(memoTable.userId, userId)));

  if (memos.length != 1) {
    return redirect('/dashboard');
  }
  const memo = memos[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-purple-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{memo.name}</span>
          <div className="ml-auto">
            <DeleteButton memoId={memo.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor memo={memo} />
        </div>
      </div>
    </div>
  );
};

export default MemoPage;
