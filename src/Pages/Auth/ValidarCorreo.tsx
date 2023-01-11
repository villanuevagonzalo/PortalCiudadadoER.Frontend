import { useContext, useRef, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

import { LabelDiv, MainContainer, Sidebar, Spinner, SubtitleDiv, TitleDiv, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetParams } from '../../Utils/generalFunctions';



export const ValidarCorreo = () =>{

/*    const [searchParams] = useSearchParams();
    const code: string | null = searchParams.get("code")
    const cuil: string | null = searchParams.get("cuil")
*/
    console.log(GetParams(["code","cuil"]))

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital/>
            <br />
            {/*(code && cuil)?"Si":"NO"*/}
            <TitleDiv>Validar Correo<AiOutlineLock/></TitleDiv>
            <SubtitleDiv>Ingresá tus datos para iniciar sesión en la plataforma.</SubtitleDiv>
            
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
}