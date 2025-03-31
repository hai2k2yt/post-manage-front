// @flow
import * as React from 'react';
import {useActionState, useEffect} from 'react';
import {SessionUser} from "@/lib/session";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";
import {saveComment} from "@/lib/actions/commentActions";
import {toast} from "sonner";
import {QueryObserverResult, RefetchOptions} from "@tanstack/react-query";
import {CommentEntity} from "@/lib/types/modelTypes";

type Props = {
  postId: number
  user: SessionUser
  className?: string
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[]
        count: number
      },
      Error
    >
  >
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined)

  useEffect(() => {

    if (state?.message) {
      toast(
        state?.ok ? "Success" : "Oops!",
        {
          description: state?.message
        }
      )
    }

    if (state?.ok) props.refetch()
  }, [state]);
  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Leave your comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Write your comment
        </DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input
            hidden
            name="postId"
            defaultValue={props.postId}
          />
          <Label htmlFor="content">Your comment</Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment