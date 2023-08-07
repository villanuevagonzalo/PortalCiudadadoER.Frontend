import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { AiOutlineArrowLeft, AiOutlineMail } from 'react-icons/ai';
import moment from 'moment';
import { DefaultFormState } from '../../Data/DefaultValues';
import { IFormState } from '../../Interfaces/Data';
import { FieldGrid, LayoutSection, LayoutTitle } from '../../Components/Layout/StyledComponents';
import { CountDown } from '../../Components/Elements/CountDown';
import { DivOutlined, DivSubtitle, DivTitle, NavigatorSpacer, Spinner } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { FormikField } from '../../Components/Forms/FormikField';
import { formGetInitialValues, formGetValidations } from '../../Interfaces/FormFields';
import { Pages } from '../../Routes/Pages';
import { AuthContext } from '../../Contexts/AuthContext';

const FormRequiredFields = [
  'Email',
  'Email_Validation'
]

export const Auth_EmailModify = () => {

  const { EmailChange, userData } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  let errors = FormState.error.split(' | ');

  return (<>
   <DivTitle className="mt-5">Modificación de Correo</DivTitle>
   <DivSubtitle className="text-center pb-4">
            Ingresa tu nueva dirección de correo electrónico.
    </DivSubtitle>
      {FormState.finish?<>
        <DivOutlined className="mt-0 flex-col" color="secondary">
          <b className='mb-2'>¡Se ha enviado el correo de validación a tu nuevo email!</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar un nuevo cambio de correo.</span>
        </DivOutlined>
      </>:<>
        {/* <div className="-mt-2 text-sm mb-2">Ingresa tu nueva dirección de correo electrónico</div> */}
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={(values:any) => {
            EmailChange({
              cuil: userData.cuil,
              new_email: values.Email
            }, setFormState)
          }}
        ><Form autoComplete="off">
          <FormikField name="Email" disabled={FormState.loading || errors.length>1} autoFocus label='Ingresa tu nuevo email'/>
          <FormikField name="Email_Validation" disabled={FormState.loading || errors.length>1} label='Reingresa tu nuevo email'/>
          <FieldGrid className="FlexSwitchForms">
            <Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : <>Cambiar Email</>}
            </Button>
          </FieldGrid>
        <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
          {errors.length>1?<>
            <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
            {errors[0]}
          </>:FormState.error}
        </DivOutlined>
        </Form></Formik>
      </>}
      {/* <hr className=''/> */}
      {/* <FieldGrid className="FlexSwitchForms">
        <Link to={Pages.DC_CONFIGURATIONS}><Button disabled={FormState.loading || errors.length>1} color="gray">
              <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
          </Button></Link>
        <NavigatorSpacer/>
      </FieldGrid> */}
  </>);
}