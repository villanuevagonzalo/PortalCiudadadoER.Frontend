import { useContext, useRef, useState, useEffect } from 'react';
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
import { GetParams } from '../../Utils/General';
import { AuthAPI } from '../../Config/AuthAPI';

export const ErrorEmaiVerificationSent = () => {
    return(<>
        <Sidebar>
            <LogoCiudadanoDigital/>
            <br />
            <DivTitle>Verificación de correo electrónico</DivTitle>
            <br/>
            <DivSubtitle className='text-center'>¡Se produjo un error al enviar el Email de verifiicación!. Su Email ya fue validado</DivSubtitle>
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
        </>)
}