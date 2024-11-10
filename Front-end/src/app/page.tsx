// src/app/page.tsx
'use client';

import { Navbar } from '@/components/Navbar';
import { CreatePost } from '@/components/CreatePost';
import { Post } from '@/components/Post';
import { useWeb3Context } from '@/context/Web3Context';

export default function Home() {
  const { posts, loading } = useWeb3Context();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <CreatePost />
        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Post
                key={index}
                id={index}
                message={post[0]}
                author={post[1]}
                likes={Number(post[2])}
                dislikes={Number(post[3])}
                createdAt={Number(post[4])}
                modifiedAt={Number(post[5])}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}