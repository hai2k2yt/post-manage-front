// @flow
import * as React from 'react';
import {Post} from "@/lib/types/modelTypes";
import PostListItem from "@/app/user/posts/_components/post-list-item";
import Pagination from "@/components/pagination";

type Props = {
  posts: Post[]
  currentPage: number
  totalPages: number
};
const PostList = ({posts, currentPage, totalPages}: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2"></div>
        <div>Title</div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map((post) => <PostListItem key={post.id} post={post}/>)}
      <Pagination
        className="my-4"
        {...{currentPage, totalPages}}
      />
    </>
  );
};

export default PostList