// @flow
"use client"

import * as React from 'react';
import {useEffect, useState} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";
import SubmitButton from "@/components/submit-button";
import {PostFormState} from "@/lib/types/formState";
import {toast} from "sonner";

type Props = {
  state: PostFormState
  formAction: (payload: FormData) => void
};

const UpsertPostForm = ({state, formAction}: Props) => {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    if (state?.message) {
      toast(
        state?.ok ? "Success" : "Oops!",
        {
          description: state?.message
        }
      )
    }

  }, [state]);

  return (
    <form action={formAction}
          className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition">
      <input hidden name="postId" defaultValue={state?.data?.postId}/>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter the title of post"
          defaultValue={state?.data?.title ?? ""}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-red-500 animate-shake">
          {state.errors.title}
        </p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write your content here"
          rows={6}
          defaultValue={state?.data?.content ?? ""}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">
          {state.errors.content}
        </p>
      )}

      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) setImageUrl(URL.createObjectURL(e.target?.files[0]))
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">
            {state.errors.thumbnail}
          </p>
        )}
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={imageUrl || state?.data?.previousThumbnailUrl ?? ""}
            alt="thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags ?? ""}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">
          {state.errors.tags}
        </p>
      )}

      <div className="flex items-center gap-2">
        <input
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === "on"}
        />
        <Label htmlFor="published">Publish</Label>
      </div>
      {!!state?.errors?.isPublished && (
        <p className="text-red-500 animate-shake">{state.errors.isPublished}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm