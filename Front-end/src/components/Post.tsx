
'use client';
// src/components/post.tsx
import { format } from 'date-fns';
import { useWeb3Context } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

interface PostProps {
  id: number;
  message: string;
  author: string;
  likes: number;
  dislikes: number;
  createdAt: number;
  modifiedAt: number;
}

export function Post({
  id,
  message,
  author,
  likes,
  dislikes,
  createdAt,
  modifiedAt,
}: PostProps) {
  const {
    account,
    likePost,
    dislikePost,
    modifyPost,
    userLikes,
    userDislikes,
  } = useWeb3Context();

  const isAuthor = account?.toLowerCase() === author.toLowerCase();
  const hasLiked = userLikes.includes(id);
  const hasDisliked = userDislikes.includes(id);

  const handleModify = async () => {
    const newMessage = prompt('Edit your post:', message);
    if (newMessage && newMessage !== message) {
      await modifyPost(id, newMessage);
    }
  };

  const handleLike = () => {
    if (!account) {
      alert('Please connect your wallet to interact with posts');
      return;
    }
    likePost(id);
  };

  const handleDislike = () => {
    if (!account) {
      alert('Please connect your wallet to interact with posts');
      return;
    }
    dislikePost(id);
  };

  return (
    <Card className={`mb-4 ${isAuthor ? 'bg-blue-50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <p className={`text-sm ${isAuthor ? 'text-blue-600' : 'text-gray-500'}`}>
            By: {isAuthor && ' (You) '}
            {author}
          </p>
        </div>
        <hr/>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-medium text-gray-950">{message}</p>
          </div>
          {isAuthor && (
            <Button variant="outline" size="sm" onClick={handleModify}>
              Edit
            </Button>
          )}
        </div>
        <div className="text-sm text-gray-500">
          <p>Created: {format(createdAt * 1000, 'PPp')}</p>
          {modifiedAt > 0 && (
            <p>Modified: {format(modifiedAt * 1000, 'PPp')}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          variant={hasLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            hasLiked ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''
          }`}
        >
          <HandThumbUpIcon className="h-4 w-4" />
          {likes}
        </Button>
        <Button
          variant={hasDisliked ? "default" : "outline"}
          size="sm"
          onClick={handleDislike}
          className={`flex items-center gap-1 ${
            hasDisliked ? 'bg-red-500 hover:bg-red-600 text-white' : ''
          }`}
        >
          <HandThumbDownIcon className="h-4 w-4" />
          {dislikes}
        </Button>
      </CardFooter>
    </Card>
  );
}