'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { useComments } from '@/contexts/CommentContext';
import { Button } from '@/components/ui/button';
import type { Comment as CommentType } from '@/contexts/CommentContext';

interface CommentProps {
  comment: CommentType;
  onDelete: () => void;
}

export function Comment({ comment, onDelete }: CommentProps) {
  const { user } = useAuth();
  const { deleteComment, loading } = useComments();
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onDelete();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-purple-400 font-medium">{comment.user.username}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-200">{comment.content}</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {(user?.id === comment.userId || user?.isModerator) && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
          className="mt-2"
        >
          Delete
        </Button>
      )}
    </div>
  );
}