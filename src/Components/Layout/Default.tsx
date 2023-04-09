import { Outlet } from "react-router-dom"
import { LayoutContainer, LayoutSidebar } from "./StyledComponents"
import { MainContainer } from "../Elements/StyledComponents"
import { LayoutSidebarLogos } from "./LayoutSidebarLogos"
import { Descripcion } from "../Elements/Descripcion"

export const LayoutDefault = () =>{
  return (
    <LayoutContainer className='FlexSwitchMobile'>
      <LayoutSidebar>
        <LayoutSidebarLogos/>
        <Outlet></Outlet>
      </LayoutSidebar>
      <MainContainer>
        <Descripcion />
      </MainContainer>
    </LayoutContainer>
  )
}