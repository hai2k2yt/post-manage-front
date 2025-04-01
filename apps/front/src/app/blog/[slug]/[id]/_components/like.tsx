// @flow
"use client"

import * as React from 'react';
import {HeartIcon} from "@heroicons/react/24/outline";
import {HeartIcon as SolidHeartIcon} from "@heroicons/react/20/solid";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getPostLikeData, likePost, unlikePost} from "@/lib/actions/like";

type Props = {
  postId: number
};
const Like = ({postId}: Props) => {
  const {data, refetch: refetchPostLikeData} = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", postId],
    queryFn: async () => await getPostLikeData(postId)
  })

  console.log(data)

  const likeMutation = useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => refetchPostLikeData()
  })

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(postId),
    onSuccess: () => refetchPostLikeData()
  })

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {
        data?.userLikedPost ? (
          <button onClick={() => unlikeMutation.mutate()}>
            <SolidHeartIcon className="w-6 text-rose-600" />
          </button>
        ) : (
          <button onClick={() => likeMutation.mutate()}>
            <HeartIcon className="w-6" />
          </button>
        )
      }
      <p>{data?.likeCount}</p>
    </div>
  );
};

export default Like