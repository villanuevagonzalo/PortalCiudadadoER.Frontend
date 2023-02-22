
import { BiMessage } from "react-icons/bi";
import { LayoutItem } from "../../Components/Elements/StyledComponents";

export const DashBoardActor_Notificaciones = () =>(<>
    
    <h1 className="text-4xl lg:text-4x1 font-bold font-sans text-verde px-1" >
        Notificaciones
    </h1>
    <LayoutItem className="flex items-center gap-1 p-10">
        <BiMessage /> No tienes ningun mensaje
    </LayoutItem>
</>
)