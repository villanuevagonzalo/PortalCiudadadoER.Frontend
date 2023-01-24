import { ContainerItem2 } from "../Elements/StyledComponents";
import { BiMessage } from "react-icons/bi";

export const DashBoard_Mensajes = () =>(<>
    
    <h1 className="text-4xl lg:text-4x1 font-bold font-sans text-verde px-1" >
        Notificaciones
    </h1>
    <br />
    <ContainerItem2 className="flex items-center gap-1 p-10">
        <BiMessage /> No tienes ningun mensaje
    </ContainerItem2>
</>
)