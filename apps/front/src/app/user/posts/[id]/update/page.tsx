// @flow
import * as React from 'react';
import UpdatePostContainer from "@/app/user/posts/[id]/update/_components/update-post-container";
import {fetchPostById} from "@/lib/actions/postActions";

type Props = {
  params: Promise<{
    id: string
  }>
};
const Page = async (props: Props) => {
  const params = await props.params

  const post = await fetchPostById(parseInt(params.id))
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Update Post
      </h2>
      <UpdatePostContainer post={post}/>
    </div>
  );
};

export default Page