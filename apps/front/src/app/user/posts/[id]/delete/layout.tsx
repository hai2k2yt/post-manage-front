// @flow
import * as React from 'react';
import {PropsWithChildren} from "react";

type Props = PropsWithChildren;
const Layout = ({children}: Props) => {
  return (
    <div className="pt-24 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default Layout