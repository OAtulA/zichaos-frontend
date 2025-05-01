'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '@/lib/api';

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cultId: string;
  user: {
    id: string;
    username: string;
  };
};

type CommentContextType = {
  addComment: (postId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  getPostComments: (postId: string) => Promise<Comment[]>;
  loading: boolean;
  error: string | null;
};

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

export function CommentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (postId: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/comments', { postId, content });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add comment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPostComments = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/comments/post/${postId}`);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch comments');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/comments/${commentId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete comment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider value={{ 
      addComment, 
      deleteComment,
      getPostComments,
      loading, 
      error 
    }}>
      {children}
    </CommentContext.Provider>
  );
}