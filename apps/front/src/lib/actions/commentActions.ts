"use server"

import {authFetchGraphQL, fetchGraphQL} from "@/lib/fetchGraphQL";
import {print} from "graphql";
import {CREATE_COMMENT_MUTATION, GET_POST_COMMENTS} from "@/lib/gqlQueries";
import {CommentEntity} from "@/lib/types/modelTypes";
import {CreateCommentFormState} from "@/lib/types/formState";
import {CommentFormSchema} from "@/lib/zodSchemas/commentFormSchema";

export async function getPostComments(
  {
    postId,
    skip,
    take
  }: {
    postId: number
    skip: number
    take: number
  }
) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS),
    {
      postId,
      take,
      skip
    }
  )

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number
  }
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    } as CreateCommentFormState
  }

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data
    }
  })

  if (data) {
    return {
      message: "Comment created!",
      ok: true,
      open: false
    } as CreateCommentFormState
  }

  return {
    message: "Oops! Something went wrong",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries())
  } as CreateCommentFormState
}