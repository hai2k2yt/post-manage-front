// @flow 
import * as React from 'react';
import {deletePost, fetchPostById} from "@/lib/actions/postActions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import SubmitButton from "@/components/submit-button";
import {redirect} from "next/navigation";

type Props = {
  params: Promise<{
    id: string
  }>
};
const Page = async (props: Props) => {
  const params = await props.params

  const post = await fetchPostById(+params.id)

  const formAction = async (formData: FormData) => {
    "use server"
    await deletePost(+params.id)
    redirect('/user/posts')
  }

  return (
    <Card className="w-96 m-12 px-6 py-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-thin">
          <p className="text-red-500">Delete the post</p>
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>
          This action cannot be undone
        </p>
        <hr className="m-3"/>
        <p className="text-slate-400 font-bold">
          Title of the post
        </p>
        <p>
          {post.title}
        </p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant="secondary" asChild>
            <Link href="/user/posts">Cancel</Link>
          </Button>
          <SubmitButton variant="destructive">Delete</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default Page