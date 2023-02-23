import { useContext, useRef, useState, useEffect } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle, ToDo, DivOutlined } from '../../Components/Elements/StyledComponents';
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
import { LayoutColumns, LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';

const FormRequiredFields = [
    'CUIL'
]

export const EmailVerification = () => {

    const { ResendEmail } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);
    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    let errors = formState.error.split(' | ');
    console.log(errors)

    return (<>
      <LayoutSidebar>
        <LayoutSidebarLogos/>
        <DivTitle className="mt-5">Validación de Correo</DivTitle>
        {formState.finish?<>
          <DivOutlined className="mt-4 flex-col" color="secondary">
            <b className='mb-2'>¡Se ha reenviado el mail de validación a su casilla de correo!</b>
            <span className='block'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar otro codigo.</span>
          </DivOutlined>
        </>:<>
          <DivSubtitle className="text-center pb-4">
            Ingresa tu CUIL para reenviar el correo de verificación.
          </DivSubtitle>
          <Formik
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={FieldValues}
            validationSchema={formGetValidations(FormRequiredFields)}
            onSubmit={async(values:any) => {
              setFormState(prev=>({...prev, loading:true}))
              const ResetPasswordResponse = await ResendEmail({
                cuil: values.CUIL,
              })
              if(ResetPasswordResponse.status){
                setFormState(prev=>({...prev, error:'', finish: true}))
              } else{
                setFormState(prev=>({...prev, error:ResetPasswordResponse.message}))
              }
              setFormState(prev=>({...prev, loading:false}))
            }}
          ><Form autoComplete="off">
            <FormikField name="CUIL" disabled={formState.loading || errors.length>1} autoFocus/>
            <Button disabled={formState.loading || errors.length>1} type="submit">
                {formState.loading ? <Spinner/> : 'Reenviar Email'}                                
            </Button>
          </Form></Formik>
          {formState.error?<><DivOutlined open={formState.error?true:false} className="mt-4 flex-col">
            {errors.length>1?<>
          <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
          {errors[0]}</>:formState.error}
          </DivOutlined></>:<></>}
        </>}
        <br/>
        <DivLabel color="gray_tint">
          ¿Ya validaste tu correo electrónico?
        </DivLabel>
        <Link to="/Ingresar">
          <Button disabled={formState.loading} color="gray">
            Iniciar Sesión
          </Button>
        </Link>
      </LayoutSidebar>
      <MainContainer>
          <Descripcion />
      </MainContainer>
    </>);
}

/*
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
            
            <Link to="/Ingresar">
        <Button disabled={formState.loading} color="gray">
          Iniciar Sesión
        </Button>
      </Link>
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
        </>
    )*/