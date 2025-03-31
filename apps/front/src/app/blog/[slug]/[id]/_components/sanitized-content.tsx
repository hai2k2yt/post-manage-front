"use client"

import * as React from 'react';

type Props = {
  content: string;
  className?: string;
};
const SanitizedContent = (props: Props) => {
  return (
    <div
      className={props.className ?? ""}
      dangerouslySetInnerHTML={{__html: props.content}}
    />
  );
};

export default SanitizedContent