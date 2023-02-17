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

const FormRequiredFields = [
    'CUIL'
]  

export const ResetPassword = () => {

    const navigate = useNavigate();

    const ref:any = useRef(null);
    const { PasswordReset } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    
    return (
        <>
        <Sidebar>
            <LogoCiudadanoDigital/>
            <br />
            <DivTitle>Restablecer Contraseña<AiOutlineLock/></DivTitle>
            <DivSubtitle>Ingresá tu cuil para restablecer tu contraseña de la plataforma.</DivSubtitle>
            <Formik
                innerRef={ref}
                initialValues= {FieldValues}
                validationSchema={formGetValidations(FormRequiredFields)}
                onSubmit={async(values:any) => {
                    setFormState(prev=>({...prev, loading:true}))
                    console.log(values)
                    debugger;
                    const ResetPasswordResponse = await PasswordReset({
                        cuil: values.CUIL,
                    })
                    console.log(ResetPasswordResponse)
                    if(ResetPasswordResponse.status){
                        await setFormState(prev=>({...prev, error:''}))
                        navigate("/passwordreset");
                    } else{
                        setFormState(prev=>({...prev, error:ResetPasswordResponse.message}))
                        navigate("/ErrorEmailSent");
                    }
                    setFormState(prev=>({...prev, loading:false}))
                }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
            ><Form autoComplete="off">
                <FormikField name="CUIL" disabled={formState.loading}/>
                <Button disabled={formState.loading} type="submit">
                    {formState.loading ? <Spinner/> : 'Restablecer contraseña'}                                
                </Button>
            </Form></Formik> 
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>
    )
};