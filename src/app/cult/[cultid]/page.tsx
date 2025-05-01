'use client';

import { useRouter } from 'next/navigation';
import { useCult } from '@/contexts/CultContext';
import { usePost } from '@/contexts/PostContext';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import type {Post} from "@/contexts/PostContext"
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   score: number;
//   createdAt: string;
//   user: {
//     username: string;
//   };
//   _count: {
//     comments: number;
//   };
// }

export default function CultSinglePage() {
  const { cults } = useCult();
  const { getPosts, loading: postsLoading } = usePost();
  const { cultid } = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const cult = cults.find((c) => c.id === cultid);

  useEffect(() => {
    if (cultid) {
      getPosts(cultid as string)
        .then((data) => {
          setPosts(data as Post[]);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
          setPosts([]);
        });
    }
  }, [cultid, getPosts]);

  if (!cult) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg">Cult not found 🕳️</p>
          <Button onClick={() => router.push('/cult')}>Back to Cults</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="secondary" onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-6">
          <h1 className="text-4xl font-bold text-purple-400">{cult.name}</h1>

          <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
            <div>
              <h3 className="font-bold text-lg">📜 Manifesto</h3>
              <p className="text-gray-300">{cult.manifesto}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">🪄 Rituals</h3>
              <ul className="list-disc list-inside text-gray-300">
                {cult.rituals.map((ritual, i) => (
                  <li key={i}>{ritual}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Posts</h2>
            <Button onClick={() => router.push(`/cult/${cultid}/post/new`)}>
              Create Post
            </Button>
          </div>

          {postsLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard 
                  key={post.id}
                  post={post}
                  onClick={() => router.push(`/cult/${cultid}/post/${post.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No posts yet. Be the first to post!</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
