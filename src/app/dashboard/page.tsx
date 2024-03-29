import { UserButton, auth } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import CreateMemoDialog from '@/components/create-memo-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Env } from '@/constants/env';
import { db } from '@/lib/db';
import { memoTable } from '@/lib/db/schema';

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const memos = await db
    .select()
    .from(memoTable)
    .where(eq(memoTable.userId, userId))
    .orderBy(desc(memoTable.createdAt));

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-purple-600" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Memo</h1>
              <div className="w-4"></div>
              <UserButton afterSignOutUrl={Env.NEXT_PUBLIC_APP_URL} />
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {/* list all the memos */}
          {/* if no memos, display this */}
          {memos.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no memos yet.</h2>
            </div>
          )}

          {/* display all the memos */}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateMemoDialog />
            {memos.map((memo) => {
              return (
                <a href={`/memo/${memo.id}`} key={memo.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {memo.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500">
                        {new Date(memo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
