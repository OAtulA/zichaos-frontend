'use client';

import { createContext, useContext, useState } from 'react';
import { api } from '@/lib/api';

export interface Post {
  id: string;
  title: string;
  content: string;
  score: number;
  createdAt: string;
  user: {
    username: string;
  };
  _count: {
    comments: number;
    votes: number;
  };
}

interface PostContextType {
  createPost: (cultId: string, title: string, content: string) => Promise<Post>;
  getPosts: (cultId: string) => Promise<Post[]>;
  votePost: (postId: string, value: 1 | -1) => Promise<void>;
  updatePost: (postId: string, title: string, content: string) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const PostContext = createContext<PostContextType | null>(null);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePost must be used within PostProvider');
  return context;
};

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (cultId: string, title: string, content: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/post', { cultId, title, content });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async (cultId: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/post/cult/${cultId}`);
      return data;
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: string, value: 1 | -1) => {
    try {
      await api.post(`/post/${postId}/vote`, { value });
    //   eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to vote');
      throw err;
    }
  };

  const updatePost = async (postId: string, title: string, content: string) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/post/${postId}`, { title, content });
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    setLoading(true);
    try {
      await api.delete(`/post/${postId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{ 
      createPost, 
      getPosts, 
      votePost, 
      updatePost, 
      deletePost, 
      loading, 
      error 
    }}>
      {children}
    </PostContext.Provider>
  );
}