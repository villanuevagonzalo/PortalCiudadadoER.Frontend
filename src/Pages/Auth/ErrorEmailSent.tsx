import { useContext, useRef, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { useNavigate } from 'react-router-dom';

export const ErrorEmailSent = () => {
    return(<>
        <Sidebar>
            <LogoCiudadanoDigital/>
            <br />
            <DivTitle>Restablecer Contraseña<AiOutlineLock/></DivTitle>
            <br/>
            <DivSubtitle className='text-center'>¡Se produjo un error al enviar un enlace a su casilla de correo!</DivSubtitle>
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
        </>)
}