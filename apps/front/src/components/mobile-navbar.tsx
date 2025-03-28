import {PropsWithChildren, ReactNode} from "react";
import Sidebar from "@/components/ui/sidebar";
import {Bars3Icon} from "@heroicons/react/16/solid";

type Props = PropsWithChildren

const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden">
      <Sidebar
        triggerIcon={<Bars3Icon className="w-4"/> as ReactNode}
        triggerClassName="absolute top-2 left-2"
      >
        {props.children}
      </Sidebar>
    </div>
  )
}

export default MobileNavbar