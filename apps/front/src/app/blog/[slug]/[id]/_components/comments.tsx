// @flow
"use client"
import * as React from 'react';
import {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getPostComments} from "@/lib/actions/commentActions";
import {DEFAULT_PAGE_SIZE} from "@/lib/constants";
import CommentCard from "@/app/blog/[slug]/[id]/_components/comment-card";
import CommentPagination from "@/app/blog/[slug]/[id]/_components/comment-pagination";
import CommentCardSkeleton from "@/app/blog/[slug]/[id]/_components/comment-card-skeleton";

type Props = {
  postId: number
};
const Comments = ({postId}: Props) => {
  const [page, setPage] = useState(1)

  const {data, isLoading} = useQuery({
    queryKey: ['GET_POST_COMMENTS', postId, page],
    queryFn: async () => await getPostComments(
      {
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE
      }
    )
  })

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE)

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700">Comments</h6>
      <div className="flex flex-col gap-2">
        {
          isLoading
            ? Array.from({length: 12}).map((_, index) =>
              <CommentCardSkeleton key={index}/>
            )
            : data?.comments.map(comment =>
              <CommentCard key={comment.id} comment={comment}/>
            )
        }
      </div>
      <CommentPagination
        totalPages={totalPages}
        currentPage={page}
        setCurrentPage={(p) => setPage(p)}
        className="p-2"
      />
    </div>
  );
};

export default Comments