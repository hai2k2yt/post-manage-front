"use client"

import {useActionState} from "react";
import {saveNewPost} from "@/lib/actions/postActions";
import UpsertPostForm from "@/app/user/create-post/_components/upsert-post-form";

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined)
  return (
    <UpsertPostForm state={state} formAction={action} />
  )
}

export default CreatePostContainer