import { Outlet } from "react-router-dom"
import { FooterComponet } from "./Footer"
import { HeaderComponet } from "./Header"

export const DefaultLayout = () =>{
  return (
    <>
      <HeaderComponet />
      <Outlet></Outlet>
      <FooterComponet />
    </>
  )
}