"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/postActions";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

const InterceptorDeletePostPage = ({ params }: Props) => {
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    params.then((data) => setPostId(parseInt(data.id)));
  }, [params]);

  return (
    <AlertDialog open={!!postId}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href="/user/posts">Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => postId && deletePost(postId)} variant="destructive">
              <a href="/user/posts">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;
