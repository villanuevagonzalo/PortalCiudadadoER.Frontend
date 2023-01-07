import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SidebarHideableWrapper, SidebarBurger } from "../Elements/StyledComponents"
import { CgClose } from 'react-icons/cg'



export const SidebarHideable = (props: any) => {
 
  const [isOpen, setIsOpen] = useState<boolean>((props.open?props.open:false));

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (<>
    <SidebarHideableWrapper open={isOpen} width="400px">
      {props.children}
    </SidebarHideableWrapper>
    <SidebarBurger onClick={handleMenu}>
      {isOpen ? <CgClose color="var(--primary)"/> : <AiOutlineMenu color="var(--primary)"/>}
    </SidebarBurger>
  </>)
}