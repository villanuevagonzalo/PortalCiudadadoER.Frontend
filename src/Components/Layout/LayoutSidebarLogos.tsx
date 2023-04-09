import { Link } from "react-router-dom"
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital"
import { LogoER } from "../Images/LogoEntreRios"
import { LayoutCenterBox, LayoutColumns } from "./StyledComponents"

export const LayoutSidebarLogos = () =>{
  return (<>
    <LayoutCenterBox maxwidth="400px">
      <LayoutColumns className="mb-8">
        <Link to="/" className="mb-3"><LogoER width="150px" /></Link>
      </LayoutColumns>
      <LogoCiudadanoDigital/>
    </LayoutCenterBox>
  </>)
}