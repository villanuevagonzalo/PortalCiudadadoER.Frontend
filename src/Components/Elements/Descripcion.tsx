import { BiLastPage } from "react-icons/bi";
import { ContainerTextWrapper, ContainerImageWrapper } from "./StyledComponents";

import Imagen from '../../Assets/ImagenNormativas.png'

const data = {
    Instructivos: [
        {title: 'Crear una Cuenta en Ciudadano Digital', link: '#'},
        {title: 'Niveles de usuario en Ciudadano Digital', link: '#'},
        {title: 'Como validar la identidad por Aplicación en Ciudadano Digital', link: '#'},
        {title: 'Cambio de contraseña en  Ciudadano Digital', link: '#'},
        {title: 'No pude validar mi correo electrónico', link: '#'},
        {title: 'Como agregar una aplicación en Ciudadano Digital', link: '#'},
    ],
    Normativas: [
        {title: 'Reglamentación "Ciudadano Digital" - Decreto 1000/23', link: '#'},
    ]
}

export const Descripcion = (props: any) => {


    return (<>
        <ContainerImageWrapper>
            <img src={Imagen}/>
        </ContainerImageWrapper>
        <ContainerTextWrapper className="FlexSwitchTablet">
            <div>
                <h1>Instructivos</h1>
                <ul>
                    {data.Instructivos.map((item, index) => <li key={index}><h2>{item.title}</h2><span><BiLastPage /></span></li>)}
                </ul>
            </div>
            <div>
                <h1>Normativas</h1>
                <ul>
                    {data.Normativas.map((item, index) => <li key={index}><h2>{item.title}</h2><span><BiLastPage /></span></li>)}
                </ul>
            </div>
        </ContainerTextWrapper>
    </>);
}