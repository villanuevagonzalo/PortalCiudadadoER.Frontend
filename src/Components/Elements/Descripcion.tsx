import { AiOutlinePaperClip, AiOutlineSchedule } from "react-icons/ai";
import { BiNotification, BiRightArrow, BiUserCircle } from "react-icons/bi";
import { LogoER } from "./LogoEntreRios";
import { SubtitleDiv, Title, TitleDiv, ToDo } from "./StyledComponents";

export const Descripcion = (props: any) => {


    return (<ToDo>
        <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight">
        ¡Bienvenido a Ciudadano Digital!
        </h1>
        <p className="leading-normal text-1xl lg:text-2xl mb-8">
        Una forma fácil y segura de acceder a los servicios digitales del Estado con una única sesión y en un sólo lugar.
        </p>
        <p>Podrás tener tu propio escritorio virtual con los servicios mas utilizados:</p>
        <br />
        <TitleDiv color="white"><AiOutlineSchedule className="w-6"/>Servicios Online</TitleDiv>
        <SubtitleDiv color="white">Accedé a múltiples sistemas y portales estatales.</SubtitleDiv>
        <TitleDiv color="white"><AiOutlinePaperClip className="w-6"/>Mis Trámites</TitleDiv>
        <SubtitleDiv color="white">Realizá el seguimiento de los trámites o iniciá nuevos de forma On Line.</SubtitleDiv>
        <TitleDiv color="white"><BiNotification className="w-6"/>Alertas y Mensajes</TitleDiv>
        <SubtitleDiv color="white">Recibí todas las notificaciones sobre los sistemas utilizados y trámites realizados.</SubtitleDiv>
        <TitleDiv color="white"><BiUserCircle className="w-6"/>Cuentas de usuario</TitleDiv>
        <SubtitleDiv color="white">Gestioná los datos y trámites realizados dentro del estado, tanto propios como de terceros.</SubtitleDiv>

        <br />
        <LogoER />
    </ToDo>);
}
