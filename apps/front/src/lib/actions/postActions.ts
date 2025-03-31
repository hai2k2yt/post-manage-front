"use server"

import {authFetchGraphQL, fetchGraphQL} from "@/lib/fetchGraphQL";
import {GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS} from "@/lib/gqlQueries";
import {print} from "graphql"
import {Post} from "@/lib/types/modelTypes";
import {transformTakeSkip} from "@/lib/helpers";

export const fetchPosts = async (
  {
    page,
    pageSize
  }: {
    page?: number,
    pageSize?: number
  }) => {
  const {skip, take} = transformTakeSkip({page, pageSize})
  const data = await fetchGraphQL(print(GET_POSTS), {skip, take})
  return {
    posts: data.posts as Post[],
    totalPosts: data.postCount
  }
}

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), {id})

  return data.getPostById as Post
}

export async function fetchUserPosts(
  {
    page,
    pageSize
  }: {
    page?: number
    pageSize: number
  }
){
  const {take, skip} = transformTakeSkip({page, pageSize});

  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip
  })

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number
  }
}
