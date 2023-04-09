import { useContext, useEffect, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
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
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  useEffect(() => { if(userData.cuil!==''){ setFieldValues({...FieldValues, CUIL: userData.cuil }) } }, [])

  let errors = FormState.error.split(' | ')

  return (<>
      <DivTitle className="mt-5">Restablecer Contraseña</DivTitle>
      {FormState.finish?<>
        <DivOutlined className="mt-4 flex-col" color="secondary">
          <b className='mb-2'>Se ha enviado un correo para reestablecer tu contraseña</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar un nuevo email</span>
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
            const response = await PasswordReset({
              cuil: values.CUIL,
            }, setFormState)
          }}
        ><Form autoComplete="off">
          <FormikField name="CUIL" disabled={FormState.loading || errors.length>1} autoFocus/>
          <Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : 'Restablecer contraseña'}                                
          </Button>
        </Form></Formik>
        <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
        {errors.length>1?<>
          <b className='mb-2'>{errors[0]}</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos antes de solicitar un nuevo correo</span>
        </>:FormState.error}
        </DivOutlined>
      </>}
      <br/>
      <DivLabel color="gray_tint">
        ¿No quieres cambiar tu contraseña?
      </DivLabel>
      {userData.cuil!==''?
        <Link to="/Dashboard/Config" className="w-full">
          <Button disabled={FormState.loading} color="gray" className="w-full">
            Volver al Dashboard
          </Button>
        </Link>:<Link to="/Ingresar" className="w-full">
          <Button disabled={FormState.loading} color="gray" className="w-full">
            Iniciar Sesión
          </Button>
        </Link>
      }
  </>);
};