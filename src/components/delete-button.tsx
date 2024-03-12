'use client';

import React from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

type Props = {
  memoId: number;
};

const DeleteButton = ({ memoId }: Props) => {
  const router = useRouter();
  const deleteMemo = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/delete-memo', {
        memoId,
      });
      return response.data;
    },
  });

  return (
    <Button
      variant={'destructive'}
      size="sm"
      disabled={deleteMemo.isPending}
      onClick={() => {
        const confirm = window.confirm(
          'Are you sure you want to delete this memo?'
        );
        if (!confirm) return;
        deleteMemo.mutate(undefined, {
          onSuccess: () => {
            router.push('/dashboard');
          },
          onError: (err) => {
            console.error(err);
            window.alert("something went wrong")
          },
        });
      }}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;
