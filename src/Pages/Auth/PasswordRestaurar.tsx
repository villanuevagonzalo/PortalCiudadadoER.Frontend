import { useContext, useEffect, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle, DivOutlined } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';

const FormRequiredFields = [
  'CUIL'
]  

export const PasswordRestaurar = () => {

  const { userData, PasswordReset } = useContext(AuthContext);
  const [ formState, setFormState ] = useState<FormStateProps>(FormStateDefault);

  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  useEffect(() => { if(userData.cuil!==''){ setFieldValues({...FieldValues, CUIL: userData.cuil }) } }, [])

  let errors = formState.error.split(' | ')

  return (<>
    <LayoutSidebar>
      <LayoutSidebarLogos/>
      <DivTitle className="mt-5">Restablecer Contraseña</DivTitle>
      {formState.finish?<>
        <DivOutlined className="mt-4 flex-col" color="secondary">
          <b className='mb-2'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos</b>
          Se ha enviado un correo para reestablecer tu contraseña
        </DivOutlined>
      </>:<>
        <DivSubtitle className="text-center pb-4">
          Ingresá tu CUIL para restablecer tu contraseña en la plataforma.
        </DivSubtitle>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={async(values:any) => {
            setFormState(prev=>({...prev, loading:true}))
            const ResetPasswordResponse = await PasswordReset({
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
          <FormikField name="CUIL" disabled={formState.loading || formState.error?true:false} autoFocus/>
          <Button disabled={formState.loading || formState.error?true:false} type="submit">
              {formState.loading ? <Spinner/> : 'Restablecer contraseña'}                                
          </Button>
        </Form></Formik>
        {formState.error?<><DivOutlined open={formState.error?true:false} className="mt-4 flex-col">
          <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
          {errors[0]}
        </DivOutlined></>:<></>}
      </>}
      <br/>
      <DivLabel color="gray_tint">
        ¿No quieres cambiar tu contraseña?
      </DivLabel>
      {userData.cuil!==''?
        <Link to="/Dashboard/Config" className="w-full">
          <Button disabled={formState.loading} color="gray" className="w-full">
            Volver al Dashboard
          </Button>
        </Link>:<Link to="/Ingresar" className="w-full">
          <Button disabled={formState.loading} color="gray" className="w-full">
            Iniciar Sesión
          </Button>
        </Link>
      }
    </LayoutSidebar>
    <MainContainer>
        <Descripcion />
    </MainContainer>
  </>);
};