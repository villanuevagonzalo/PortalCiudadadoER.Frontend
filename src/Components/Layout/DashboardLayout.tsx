import { Outlet } from "react-router-dom"
import { Container } from "../Elements/StyledComponents"
import { FooterComponet } from "./Footer"
import { HeaderComponet } from "./Header"

export const DashboardLayout = () =>{
  return (
    <>
      <HeaderComponet />
      <Outlet></Outlet>
      <div>
        <FooterComponet />
      </div>
    </>
  )
}