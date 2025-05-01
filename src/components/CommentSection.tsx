'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { useComments } from '@/contexts/CommentContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from './Comment';
import type { Comment as CommentType } from '@/contexts/CommentContext';

interface CommentSectionProps {
  cultId: string;
  initialComments: CommentType[];
}

export function CommentSection({ cultId, initialComments }: CommentSectionProps) {
  const { user } = useAuth();
  const { addComment, loading } = useComments();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment(cultId, content);
      // Refresh comments or add optimistically
      setComments([
        {
          id: Date.now().toString(),
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user!.id,
          cultId,
          user: {
            id: user!.id,
            username: user!.username,
          },
        },
        ...comments,
      ]);
      setContent('');
      setError('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-purple-400">Comments</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="bg-zinc-800 border-zinc-700"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" disabled={loading || !content.trim()}>
            Post Comment
          </Button>
        </form>
      ) : (
        <p className="text-gray-400">Please login to comment</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={() => handleDelete(comment.id)}
          />
        ))}
      </div>
    </div>
  );
}