import { Outlet } from "react-router-dom"
import { LayoutContainer, LayoutSidebar } from "./StyledComponents"
import { MainContainer } from "../Elements/StyledComponents"
import { LayoutSidebarLogos } from "./LayoutSidebarLogos"
import { Descripcion } from "../Elements/Descripcion"

export const LayoutDefault = () =>{
  return (
    <LayoutContainer className='FlexSwitchMobile'>
      <LayoutSidebar>
        <div className="Content">
          <LayoutSidebarLogos/>
          <Outlet></Outlet>
        </div>
      </LayoutSidebar>
      <MainContainer>
        <Descripcion />
      </MainContainer>
    </LayoutContainer>
  )
}