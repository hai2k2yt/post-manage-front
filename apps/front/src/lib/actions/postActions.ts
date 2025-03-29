"use server"

import {fetchGraphQL} from "@/lib/fetchGraphQL";
import {GET_POSTS} from "@/lib/gqlQueries";
import {print} from "graphql"
import {Post} from "@/lib/types/modelTypes";
export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS))
  return data.posts as Post[]
}