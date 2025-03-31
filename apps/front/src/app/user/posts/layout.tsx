// @flow
import * as React from 'react';
import {PropsWithChildren} from "react";

type Props = PropsWithChildren;
const PostsLayout = ({children}: Props) => {
  return (
    <div className="">
      {children}
    </div>
  );
};

export default PostsLayout