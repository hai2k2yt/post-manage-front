// @flow 
import * as React from 'react';
import CreatePostContainer from "@/app/user/create-post/_components/create-post-container";


const Page = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Create a New Post
      </h2>
      <CreatePostContainer />
    </div>
  );
};

export default Page