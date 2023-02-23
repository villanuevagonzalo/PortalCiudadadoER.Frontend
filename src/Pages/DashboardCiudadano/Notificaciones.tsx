
import { BiMessage } from "react-icons/bi";
import { LayoutSection, LayoutTitle } from "../../Components/Layout/StyledComponents";

export const DashBoard_Notificaciones = () =>{

  return (<>
    <LayoutTitle>
      Notificaciones
    </LayoutTitle>
    <LayoutSection className="items-center">
      <BiMessage /> No tienes ningun mensaje
    </LayoutSection>
  </>)
}