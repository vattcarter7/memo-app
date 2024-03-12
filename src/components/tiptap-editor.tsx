'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useMutation } from '@tanstack/react-query';
import { EditorContent, useEditor } from '@tiptap/react';

import { useDebounce } from '@/lib/use-debounce';
import { MemoType } from '@/lib/db/schema';

import TipTapMenuBar from './tiptap-menu-bar';
import { Button } from './ui/button';

type Props = { memo: MemoType };

const TipTapEditor = ({ memo }: Props) => {
  const [content, setContentState] = useState<string>(
    memo.content || `<h1>${memo.name}</h1>`
  );

  const saveMemo = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/save-memo', {
        memoId: memo.id,
        content,
      });
      return response.data;
    },
  });

  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContentState(editor.getHTML());
    },
  });

  const debouncedContent = useDebounce(content, 500);

  useEffect(() => {
    // save to db
    if (debouncedContent === '') return;
    saveMemo.mutate(undefined, {
      onSuccess: (data) => {
        console.log('success update!', data);
      },
      onError: (err) => {
        console.error(err);
        window.alert("something went wrong")
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);
  
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button className="ml-2" disabled variant={'outline'}>
          {saveMemo.isPending ? 'Saving...' : 'Saved'}
        </Button>
      </div>

      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
    </>
  );
};

export default TipTapEditor;
