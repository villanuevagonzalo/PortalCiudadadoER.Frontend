import { AiOutlinePaperClip, AiOutlineSchedule } from "react-icons/ai";
import { BiNotification, BiRightArrow, BiUserCircle } from "react-icons/bi";
import { LogoER } from "../Images/LogoEntreRios";
import { DivSubtitle, Title, DivTitle, ToDo } from "./StyledComponents";

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
        <DivTitle color="white"><AiOutlineSchedule className="w-6"/>Servicios Online</DivTitle>
        <DivSubtitle color="white">Accedé a múltiples sistemas y portales estatales.</DivSubtitle>
        <DivTitle color="white"><AiOutlinePaperClip className="w-6"/>Mis Trámites</DivTitle>
        <DivSubtitle color="white">Realizá el seguimiento de los trámites o iniciá nuevos de forma On Line.</DivSubtitle>
        <DivTitle color="white"><BiNotification className="w-6"/>Alertas y Mensajes</DivTitle>
        <DivSubtitle color="white">Recibí todas las notificaciones sobre los sistemas utilizados y trámites realizados.</DivSubtitle>
        <DivTitle color="white"><BiUserCircle className="w-6"/>Cuentas de usuario</DivTitle>
        <DivSubtitle color="white">Gestioná los datos y trámites realizados dentro del estado, tanto propios como de terceros.</DivSubtitle>

        <br />
        <LogoER />
    </ToDo>);
}
