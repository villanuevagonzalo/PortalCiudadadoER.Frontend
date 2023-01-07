import { useContext, useRef, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';

import { LabelDiv, MainContainer, Sidebar, Spinner, SubtitleDiv, TitleDiv, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Elements/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';

const FormRequiredFields = [
    'CUIL',
    'Password',
]   

export const LoginPage = () =>{

    const ref:any = useRef(null);
    const { Login } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital/>
            <br />
            <TitleDiv>Iniciar Sesión<AiOutlineLock/></TitleDiv>
            <SubtitleDiv>Ingresá tus datos para iniciar sesión en la plataforma.</SubtitleDiv>
            <Formik
                innerRef={ref}
                initialValues= {FieldValues}
                validationSchema={formGetValidations(FormRequiredFields)}
                onSubmit={async(values:any) => {
                    setFormState(prev=>({...prev, loading:true}))
                    console.log(values)
                    await Login({
                        cuil: values.CUIL,
                        password: values.Password
                    })
                    setFormState(prev=>({...prev, loading:false}))
                }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
            ><Form autoComplete="off">
                <FormikField name="CUIL" disabled={formState.loading}/>
                <FormikField name="Password" disabled={formState.loading}/>
                <FormikField name="RememberMe" disabled={formState.loading}/>
                <Button disabled={formState.loading} type="submit">
                    {formState.loading ? <Spinner/> : 'Iniciar Sesión'}                                
                </Button>
            </Form></Formik>
            <br />
            <LabelDiv color="secondary">¿Sos nuevo en Ciudadano Digital?</LabelDiv>
            <Link to="/Registro" className="w-full"><Button disabled={formState.loading} color="secondary">
                Crear una cuenta                               
            </Button></Link>
            <br />
            <br />
            <LabelDiv>¿Tuviste algun problema al registrarte?</LabelDiv>
            <Link to="/RestaurarPassword" className="w-full"><Button disabled={formState.loading} color="disabled">
                No recuerdo mi contraseña                              
            </Button></Link>
            <Button disabled={formState.loading} color="disabled" className="w-full">
                No pude validar mi correo electrónico                            
            </Button>  
        </Sidebar>
        <MainContainer>
            <ToDo>Normativas</ToDo>
        </MainContainer>
    </>)
}