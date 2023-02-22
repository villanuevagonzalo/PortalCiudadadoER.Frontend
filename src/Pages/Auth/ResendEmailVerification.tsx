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
import { LogoER } from '../../Components/Images/LogoEntreRios';
import { LayoutColumns } from '../../Components/Layout/StyledComponents';

const FormRequiredFields = [
    'CUIL'
]

export const ResendEmailVerification = () => {

    const navigate = useNavigate();

    const ref:any = useRef(null);
    const { ResendEmail } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);
    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    return (
        <>
        <Sidebar>
        <LayoutColumns className="mb-8">
          <LogoER width="150px" />
        </LayoutColumns>
        <LogoCiudadanoDigital/>
        <DivTitle className="mt-5">Verificación de correo electrónico</DivTitle>
        <DivSubtitle className="text-center pb-4">
        Ingresa tu cuil para reenviar el correo de verificación.
        </DivSubtitle>
            <Formik
                innerRef={ref}
                initialValues= {FieldValues}
                validationSchema={formGetValidations(FormRequiredFields)}
                onSubmit={async(values:any) => {
                    setFormState(prev=>({...prev, loading:true}))
                    console.log(values)
                    const ResetPasswordResponse = await ResendEmail({
                        cuil: values.CUIL,
                    })
                    console.log(ResetPasswordResponse)
                    if(ResetPasswordResponse.status){
                        await setFormState(prev=>({...prev, error:''}))
                        navigate("/EmailVerificationSent");
                    } else{
                        setFormState(prev=>({...prev, error:ResetPasswordResponse.message}))
                        navigate("/ErrorEmailVerificationSent");
                    }
                    setFormState(prev=>({...prev, loading:false}))
                }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
            ><Form autoComplete="off">
                <FormikField name="CUIL" disabled={formState.loading} autoFocus/>
                <Button disabled={formState.loading} type="submit">
                    {formState.loading ? <Spinner/> : 'Reenviar Email'}                                
                </Button>
            </Form></Formik>
        <br/>
      <DivLabel color="gray_tint">
        ¿Ya validaste tu correo electrónico?
      </DivLabel>
            
            <Link to="/Ingresar" className="w-full">
        <Button disabled={formState.loading} color="gray" className="w-full">
          Iniciar Sesión
        </Button>
      </Link>
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
        </>
    )
}