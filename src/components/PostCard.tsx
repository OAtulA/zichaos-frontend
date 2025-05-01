'use client';

import { usePost } from '@/contexts/PostContext';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, MessageCircleIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface PostCardProps {
  post: {
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
    };
  };
  onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const { votePost } = usePost();

  const handleVote = async (value: 1 | -1) => {
    try {
      await votePost(post.id, value);
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  return (
    <div 
      className="bg-zinc-900 p-4 rounded-lg space-y-2 cursor-pointer hover:bg-zinc-800 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote(1)}
            className="text-zinc-400 hover:text-purple-400"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium">{post.score}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote(-1)}
            className="text-zinc-400 hover:text-purple-400"
          >
            <ArrowDownIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-zinc-400 mt-1">{post.content}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
            <span>Posted by {post.user.username}</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="h-4 w-4" />
              <span>{post._count.comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}