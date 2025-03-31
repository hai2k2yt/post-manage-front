"use client"

// @flow
import * as React from 'react';
import {use} from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {deletePost} from "@/lib/actions/postActions";
import {Button} from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string
  }>
};
const InterceptorDeletePostPage = async (props: Props) => {
  const params = use(props.params)
  const postId = parseInt(params.id)
  return (
    <AlertDialog open={!!postId}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete post
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href="/user/posts">Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => deletePost(postId)}
              variant="destructive"
            >
              <a href="/user/posts">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage