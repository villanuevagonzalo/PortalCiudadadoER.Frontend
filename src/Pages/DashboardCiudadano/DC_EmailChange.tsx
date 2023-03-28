import { useContext, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { Spinner, DivOutlined, NavigatorSpacer } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineArrowLeft, AiOutlineMail } from 'react-icons/ai';
import { FieldGrid, LayoutSection, LayoutTitle } from '../../Components/Layout/StyledComponents';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';

const FormRequiredFields = [
  'Email',
  'Email_Validation'
]

export const DC_EmailChange = () => {

  const { EmailChange, userData } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  let errors = FormState.error.split(' | ');

  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutSection>
    <h1><AiOutlineMail className='small'/>Cambiar Correo Electrónico</h1>
      {FormState.finish?<>
        <DivOutlined className="mt-0 flex-col" color="secondary">
          <b className='mb-2'>¡Se ha enviado el correo de validación a tu nuevo email!</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar un nuevo cambio de correo.</span>
        </DivOutlined>
      </>:<>
        <div className="-mt-2 text-sm mb-2">Ingresa tu nueva dirección de correo electrónico</div>
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
            <NavigatorSpacer/>
            <div><Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : <>Cambiar Email</>}
            </Button></div>
          </FieldGrid>
        <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
          {errors.length>1?<>
            <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
            {errors[0]}
          </>:FormState.error}
        </DivOutlined>
          
        </Form></Formik>
      </>}
      <hr className=''/>
      <FieldGrid className="FlexSwitchForms">
        <Link to="/Dashboard/Config"><Button disabled={FormState.loading || errors.length>1} color="gray">
              <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
          </Button></Link>
        <NavigatorSpacer/>
      </FieldGrid>
    </LayoutSection>
  </>);
}