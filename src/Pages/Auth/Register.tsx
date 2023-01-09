import { useContext, useEffect, useRef, useState } from 'react';
import { formGetValidations, formGetInitialValues, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { FormikError, LabelDiv, MainContainer, Sidebar, SubtitleDiv, Title2Div, TitleDiv, ToDo } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { LogoCiudadanoDigital } from '../../Components/Elements/LogoCiudadanoDigital';

import React from 'react';
import { FormikStep, FormikStepper } from '../../Components/Forms/FormikStepper';
import { FormikField } from '../../Components/Forms/FormikField';
import { FormikCaptcha } from '../../Components/Forms/FormikCaptcha';
import { CapitalizeWords } from '../../Utils/generalFunctions';
import { Descripcion } from '../../Components/Elements/Descripcion';
    
const FormRequiredFields = [
    'CUIL',
    'Name',
    'LastName',
    'Password',
    'Password_Validation',
    'Email',
    'Email_Validation',
    'Captcha',
    'AcceptTerms',
    'prs_id'
]

const AxiosAuthAPI = new AuthAPI();

export const RegisterPage = () =>{

    const ref:any = useRef(null);
    const { Signup } = useContext(AuthContext);

    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

    const [formError, setFormError] = useState<string>('');
    
    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital/>
            <br />
            <TitleDiv>Crear una Cuenta</TitleDiv>
            <SubtitleDiv>Ingresá tus datos para registrarte en la plataforma.</SubtitleDiv>
            <FormikStepper
                innerRef={ref}
                initialValues={FieldValues}
                onSubmit={async (values:any) =>{
                    await Signup({
                        cuil: values.CUIL,
                        nombre: values.Name,
                        apellido: values.LastName,
                        email: values.Email_Validation,
                        password: values.Password_Validation,
                        prs_id: values.prs_id
                    }, setFormError)
                }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                formState2={[formState, setFormState]}
            >
                <FormikStep
                    label="CUIL"
                    validationSchema={formGetValidations(['CUIL'])}
                    afterFunction={async (values:any) =>{
                        await AxiosAuthAPI.GetUserData({'cuil':ref.current.values.CUIL}).then((response)=>{
                            let userdata = response.data.user
                            //console.log(response)
                            setFieldValues({...values, 
                                Name: CapitalizeWords(userdata.Nombres), 
                                LastName: CapitalizeWords(userdata.Apellido), 
                                prs_id: userdata.id
                            });
                        })
                    }}
                >
                    <Title2Div>Paso 1</Title2Div>
                    <SubtitleDiv>Verifica tu CUIL</SubtitleDiv>
                    <FormikField name="CUIL" autoFocus disabled={formState.loading}/>
                    <Link to="/Ingresar"><LabelDiv>
                        No lo recuerdo / no tengo mi CUIL
                    </LabelDiv></Link>
                </FormikStep>
                <FormikStep
                    label="Datos Personales"
                    validationSchema={formGetValidations(['Name','LastName'])}
                >
                    <Title2Div>Paso 2</Title2Div>
                    <SubtitleDiv>Datos Personales</SubtitleDiv>
                    <FormikField name="Name" autoFocus disabled={formState.loading}/>
                    <FormikField name="LastName" disabled={formState.loading}/>
                </FormikStep>
                <FormikStep
                    label="Email"
                    validationSchema={formGetValidations(['Email','Email_Validation'])}
                >
                    <Title2Div>Paso 3</Title2Div>
                    <SubtitleDiv>Datos de Contacto</SubtitleDiv>
                    <FormikField name="Email" autoFocus disabled={formState.loading}/>
                    <FormikField name="Email_Validation" disabled={formState.loading}/>
                </FormikStep>
                <FormikStep
                    label="Contraseña"
                    validationSchema={formGetValidations(['Password','Password_Validation'])}
                >
                    <Title2Div>Paso 4</Title2Div>
                    <SubtitleDiv>Contraseña</SubtitleDiv>
                    <FormikField name="Password" autoFocus disabled={formState.loading}/>
                    <FormikField name="Password_Validation" disabled={formState.loading}/>
                </FormikStep>
                <FormikStep
                    label="Final"
                    validationSchema={formGetValidations(['Captcha','AcceptTerms'])}
                >
                    <Title2Div>Paso 5</Title2Div>
                    <SubtitleDiv>Confirmación Final</SubtitleDiv>
                    <FormikCaptcha name="Captcha"/>
                    <FormikField name="Captcha" hidden/>
                    <FormikField name="AcceptTerms"/>
                </FormikStep>
            </FormikStepper>
            <FormikError open={formError?true:false}>{formError}</FormikError>
            <br />
                               
            <LabelDiv>¿Ya te registraste?</LabelDiv>
            <Link to="/Ingresar" className="w-full"><Button disabled={formState.loading}>
                Iniciar Sesión
            </Button></Link>
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
}