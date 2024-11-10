import { useState } from 'react';
import { useWeb3Context } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CreatePost() {
  const [message, setMessage] = useState('');
  const { publishPost, account } = useWeb3Context();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await publishPost(message);
      setMessage('');
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  if (!account) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's happening?"
            className="flex-1"
          />
          <Button type="submit">Post</Button>
        </form>
      </CardContent>
    </Card>
  );
}
