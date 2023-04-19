
import { BiMessage } from "react-icons/bi";
import { LayoutSection, LayoutTitle } from "../../../Components/Layout/StyledComponents";

export const DC_Notifications = () =>{

  return (<>
    <LayoutTitle>
      Notificaciones
    </LayoutTitle>
    <LayoutSection className="items-center">
      <BiMessage /> No tienes ningun mensaje
    </LayoutSection>
  </>)
}