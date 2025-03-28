import {PropsWithChildren} from "react";

type Props = PropsWithChildren

const DesktopNavbar = (props: Props) => {


  return (
    <nav className="fixed bg-white w-screen z-30">
      <div className="flex items-center px-4 py-4 container w-full">
        {
          props.children
        }
      </div>
      <hr className="border-b border-gray-100 opacity-25"/>
    </nav>
  )
}

export default DesktopNavbar