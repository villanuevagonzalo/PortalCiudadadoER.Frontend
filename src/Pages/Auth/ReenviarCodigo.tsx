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

const FormRequiredFields = [
    'Email'
]   

export const ReenviarCodigo = () =>{

    const ref:any = useRef(null);
    const { Login } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital/>
            <br />
            <DivTitle>Iniciar Sesión<AiOutlineLock/></DivTitle>
            <DivSubtitle>Ingresá tus datos para iniciar sesión en la plataforma.</DivSubtitle>
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
                <FormikField name="Email" disabled={formState.loading}/>
                <Button disabled={formState.loading} type="submit">
                    {formState.loading ? <Spinner/> : 'Iniciar Sesión'}                                
                </Button>
            </Form></Formik>
            <br />
            <DivLabel color="secondary">¿Sos nuevo en Ciudadano Digital?</DivLabel>
            <Link to="/Registro" className="w-full"><Button disabled={formState.loading} color="secondary">
                Crear una cuenta                               
            </Button></Link>
            <br />
            <DivLabel color="gray_tint">¿Tuviste algun problema al registrarte?</DivLabel>
            <Link to="/RestaurarPassword" className="w-full"><Button disabled={formState.loading} color="gray">
                No recuerdo mi contraseña
                <AiOutlineLock/>                        
            </Button></Link>
            <Button disabled={formState.loading} color="gray" className="w-full">
                No pude validar mi correo electrónico                            
            </Button>  
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
}