'use client';

import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2, Plus } from 'lucide-react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type Props = {};

const CreateMemoDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState('');

  const createMemo = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/create-memo', {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      window.alert('Please enter a name for your memo');
      return;
    }
    createMemo.mutate(undefined, {
      onSuccess: ({ memo_id }) => {
        router.push(`/memo/${memo_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert('Failed to create new memo');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-purple-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-4 h-4 text-purple-600" strokeWidth={3} />
          <h3 className="font-semibold text-purple-600 sm:mt-2">New Memo</h3>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Memo</DialogTitle>
          <DialogDescription>
            You can create a new memo by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="bg-purple-600"
              disabled={createMemo.isPending}
            >
              {createMemo.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemoDialog;
