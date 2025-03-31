"use server"

import {authFetchGraphQL, fetchGraphQL} from "@/lib/fetchGraphQL";
import {CREATE_POST_MUTATION, GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS} from "@/lib/gqlQueries";
import {print} from "graphql"
import {Post} from "@/lib/types/modelTypes";
import {transformTakeSkip} from "@/lib/helpers";
import {PostFormState} from "@/lib/types/formState";
import {PostFormSchema} from "@/lib/zodSchemas/postFormSchema";

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
) {
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

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    } as PostFormState
  }

  const thumbnailUrl = ""

  const data = authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl
    }
  })

  if (data) {
    return {
      message: "Success! New post saved",
      ok: true
    }
  }

  return {
    message: "Oops! Something wrong",
    ok: false
  }

}