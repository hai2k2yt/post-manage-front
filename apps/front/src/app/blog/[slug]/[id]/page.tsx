// @flow 
import * as React from 'react';
import {fetchPostById} from "@/lib/actions/postActions";
import Image from "next/image";
import SanitizedContent from "@/app/blog/[slug]/[id]/_components/sanitized-content";
import Comments from "@/app/blog/[slug]/[id]/_components/comments";

type Props = {
  params: {
    id: string
  }
};
const PostPage = async ({params}: Props) => {
  const postId = (await params).id
  const post = await fetchPostById(+postId)

  return (
    <main className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">
        {post.title}
      </h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          src={post.thumbnail ?? "/no-image.png"}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <SanitizedContent content={post.content} />

      <Comments postId={post.id} />
    </main>
  );
};

export default PostPage