import { useContext, useEffect, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, Spinner, DivSubtitle, DivTitle, DivOutlined, NavigatorSpacer } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';
import { FormikCaptcha } from '../../Components/Forms/FormikCaptcha';
import { Pages } from '../../Routes/Pages';
import { FieldGrid, LayoutSection, LayoutTitle } from '../../Components/Layout/StyledComponents';
import { BsFillKeyFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const FormRequiredFields = [
  'CUIL',
  'Captcha'
]  

export const DC_Configurations_HomePasswordReset = () => {

  const { userData, PasswordReset } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  useEffect(() => { if(userData.cuil!==''){ setFieldValues({...FieldValues, CUIL: userData.cuil }) } }, [])

  let errors = FormState.error.split(' | ')

  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutSection>
    <h1><BsFillKeyFill className='small'/>Cambiar Contraseña</h1>
    {FormState.finish?<>
        <DivOutlined className="mt-4 flex-col" color="secondary">
          <b className='mb-2'>Se ha enviado un correo para reestablecer tu contraseña</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar un nuevo email</span>
        </DivOutlined>
      </>:<>
        <div className="-mt-2 text-sm mb-2">Ingresá tu CUIL para restablecer tu contraseña en la plataforma.</div>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={async(values:any) => {
            const response = await PasswordReset({
              cuil: values.CUIL,
              captcha: values.Captcha,
            }, setFormState)
          }}
        ><Form autoComplete="off">
          <FormikField name="CUIL" disabled={FormState.loading || errors.length>1} autoFocus/>
          <FieldGrid className="FlexSwitchForms">
          <FormikCaptcha name="Captcha" state={FormState}/>
          </FieldGrid>
          <FieldGrid className="FlexSwitchForms">
            <NavigatorSpacer/>
            <div><Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : 'Restablecer contraseña'}
            </Button></div>
          </FieldGrid>
        </Form></Formik>
        <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
        {errors.length>1?<>
          <b className='mb-2'>{errors[0]}</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos antes de solicitar un nuevo correo</span>
        </>:FormState.error}
        </DivOutlined>
      </>}
      <br/>
      {/* <DivLabel color="gray_tint">
        ¿No quieres cambiar tu contraseña?
      </DivLabel> */}
      {userData.cuil!==''?
        // <Link to={Pages.DC_CONFIGURATIONS} className="w-full">
        //   <Button disabled={FormState.loading} color="gray" className="w-full">
        //     Volver al Dashboard
        //   </Button>
        // </Link>
        <></>
        :
        <Link to={Pages.AUTH_LOGIN} className="w-full">
          <Button disabled={FormState.loading} color="gray" className="w-full">
            Iniciar Sesión
          </Button>
        </Link>
      }
      <hr className=''/>
      <FieldGrid className="FlexSwitchForms">
        <Link to={Pages.DC_CONFIGURATIONS}><Button disabled={FormState.loading || errors.length>1} color="gray">
              <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
          </Button></Link>
        <NavigatorSpacer/>
      </FieldGrid>
    </LayoutSection>     
  </>);
};