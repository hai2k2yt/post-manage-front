"use client"

import {PropsWithChildren, ReactNode, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {useOnClickOutside} from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string
}>

const Sidebar = (props: Props) => {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null!)
  useOnClickOutside(ref, () => setShow(false))
  return (
    <>
      <button className={props.triggerClassName ?? ""} onClick={() => setShow(prev => !prev)}>
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={
          cn("w-60 absolute duration-300 top-0 z-10 transition-all bg-white rounded-r-md min-h-screen", {
            "-left-full": !show,
            "left-0": show
          })
        }>
        {props.children}
      </div>
    </>
  )
}
export default Sidebar