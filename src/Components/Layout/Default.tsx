import { Outlet } from "react-router-dom"
import { LayoutContainer } from "./StyledComponents"

export const DefaultLayout = () =>{
  return (
    <LayoutContainer className='FlexSwitchMobile'>
      <Outlet></Outlet>
    </LayoutContainer>
  )
}