'use client';

import { useParams, useRouter } from 'next/navigation';
import { Post, usePost } from '@/contexts/PostContext';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentSection } from '@/components/CommentSection';

export default function PostDetailPage() {
  const { cultid, postid } = useParams();
  const { getPost } = usePost();
  const router = useRouter();
  const [post, setPost] = useState<null| Post>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postid) {
      getPost(postid as string)
        .then(setPost)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [postid, getPost]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button onClick={() => router.push(`/cult/${cultid}`)}>
          Back to Cult
        </Button>

        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-300">{post.content}</p>
        </div>

        <CommentSection postId={postid as string} />
      </div>
    </main>
  );
}