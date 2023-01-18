import { useState } from "react";
import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineAppstore } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DashBoard_Aplicaciones } from "../../Components/DashboardCiudadano/Aplicaciones";
import { DashBoard_Credenciales } from "../../Components/DashboardCiudadano/Credenciales";
import { DashBoard_Default } from "../../Components/DashboardCiudadano/Default";
import { DashBoard_Mensajes } from "../../Components/DashboardCiudadano/Mensajes";
import { DashBoard_Tramites } from "../../Components/DashboardCiudadano/Tramites";
import { Hero } from "../../Components/Elements/Hero";
import { Container, IconContainer, IconBox, Title, Box, NavigationBar, ContainerBody, ContainerCard, Sidebar, TitleDiv, MainContainer, ToDo } from "../../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../../Components/Images/LogoCiudadanoDigital";
import { Descripcion } from "../../Components/Elements/Descripcion";
import { CapitalizeWords } from '../../Utils/generalFunctions';




export const InicioPage = () => {

    return(<>
    <div>
        <div>
            <ContainerCard >
                <br />
                <br />
            <div className="text-left text-black px-7" >
                Ciudadano digital es una plataforma donde cualquier ciudadano puede realizar algún trámite ante organismos públicos
                <br />
                provinciales desde su casa, oficina y/o dispositivo móvil.
                <br />
                <br />
                Los trámites que se encuentran aquí son 100% digitales sin necesidad de papel ni acudir a un organismo público,
                <br />
                permitiendo ahorrar tiempo.
             </div>
                <br />
                <br />
            </ContainerCard>
                <br />
                <br />
                <h1 className="text-4xl lg:text-4x1 font-bold text-verde px-7" >
                    Nuevos Trámites
                </h1>
            
        </div>
        
    </div>
        

    </>);
    
}