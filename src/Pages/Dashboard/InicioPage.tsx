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
import { Container, IconContainer, IconBox, Title, Box, NavigationBar, ContainerBody, ContainerCard, Sidebar, TitleDiv,Title2Div, MainContainer, ToDo, LabelDiv } from "../../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../../Components/Images/LogoCiudadanoDigital";
import { Descripcion } from "../../Components/Elements/Descripcion";
import { CapitalizeWords } from '../../Utils/generalFunctions';
import { RiToolsFill, RiWheelchairFill, RiHome4Fill, RiSeedlingFill} from "react-icons/ri";

const data = [
    {title: 'Discapacidad', icon: RiWheelchairFill, href: '', description: 'Certificado único de discapacidad CUD'},
    {title: 'Trabajo', icon: RiToolsFill, href: '', description: 'Requisitos para contrataciones de artistas'},
    {title: 'Vivienda', icon: RiHome4Fill, href: '', description: 'Solicitud certificado de vivienda de interés social'},
    {title: 'Medio Ambiente', icon: RiSeedlingFill, href: '', description: 'solicitud de quema controlada'},
]




export const InicioPage = () => {

    return(<>
    <div>
        <div className=" pr-9 mr-9">
                <br />
            <ContainerCard >
                <br />
                <br />
            <div className="text-left text-black px-7" >
                <p>Ciudadano digital es una plataforma donde cualquier ciudadano puede realizar algún trámite ante organismos públicos</p>
                <p>provinciales desde su casa, oficina y/o dispositivo móvil.</p>
                <br />
                <p>Los trámites que se encuentran aquí son 100% digitales sin necesidad de papel ni acudir a un organismo público,</p>
                <p>permitiendo ahorrar tiempo.</p>
            </div>
                <br />
                <br />
            </ContainerCard>
                <br />
                <br />
                <h1 className="text-4xl lg:text-4x1 font-bold font-sans text-verde px-7" >
                    Nuevos Trámites
                </h1>
                <br />
                <div className="flex gap-6 grid grid-cols-4 ">

                    {
                        data.map((item, index) => {
                            return(
                                <ContainerCard key={index}>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-2xl text-verde">
                                        <item.icon></item.icon>
                                        </span>
                                        <div className="text-left text-black text-base">
                                            <h1 className="font-black">{CapitalizeWords(item.title)}</h1>
                                            <h2 className="">{item.description}</h2>
                                        </div>    
                                    </div>
                                </ContainerCard>
                            )
                        })
                    }
                
                {/* <ContainerCard className="w-90">    
                    <div className="flex items-center gap-1 mt-1 w-90">
                        <span className="text-2xl text-verde">
                        <RiWheelchairFill></RiWheelchairFill>
                        </span>
                        <div className="text-left text-black text-lg">
                            <h1 className="font-black">Discapacidad</h1>
                            <h2 className="">Certificado único de discapacidad CUD</h2>
                        </div>    
                    </div>
                </ContainerCard> */}
                </div>
            
        </div>
        
        
    </div>

    </>);
    
}