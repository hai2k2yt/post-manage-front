// @flow
import * as React from 'react';
import {fetchUserPosts} from "@/lib/actions/postActions";
import {DEFAULT_PAGE_SIZE} from "@/lib/constants";
import NoPost from "@/app/user/posts/_components/no-post";
import PostList from "@/app/user/posts/_components/post-list";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};
const Page = async ({searchParams}: Props) => {
  const {page} = await searchParams;
  const {totalPosts, posts} = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE
  })

  return (
    <div className="pt-24">
      {
        !posts || !posts.length
          ? (
            <NoPost/>
          ) : (
            <PostList
              posts={posts}
              currentPage={page ? +page : 1}
              totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
            />
          )
      }
    </div>
  );
};

export default Page