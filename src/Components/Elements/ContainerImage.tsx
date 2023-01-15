import { AiOutlinePaperClip, AiOutlineSchedule } from "react-icons/ai";
import { BiNotification, BiRightArrow, BiUserCircle } from "react-icons/bi";
import { LogoER } from "../Images/LogoEntreRios";
import { ContainerImageWrapper, DivSubtitle, Title, DivTitle, ToDo } from "./StyledComponents";

import Imagen from '../../Assets/imagenilustrativa.png'

export const ContainerImage = (props: any) => {


    return (<ContainerImageWrapper>
        <img src={Imagen}/>
    </ContainerImageWrapper>);
}
