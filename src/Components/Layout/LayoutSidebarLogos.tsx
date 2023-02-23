import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital"
import { LogoER } from "../Images/LogoEntreRios"
import { LayoutCenterBox, LayoutColumns } from "./StyledComponents"

export const LayoutSidebarLogos = () =>{
  return (<>
    <LayoutColumns className="mb-8">
      <LogoER width="150px" />
    </LayoutColumns>
    <LayoutCenterBox maxwidth="400px">
      <LogoCiudadanoDigital/>
    </LayoutCenterBox>
  </>)
}